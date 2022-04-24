import { ClientFromJWT } from './../interfaces/client-from-jwt.interface';
import { ClientsService } from './../../clients/services/clients.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const client = await this.clientsService.getClientByEmail(email, [
      'id',
      'email',
      'password',
    ]);

    /*
     * NOTE: Previne Enumeração de usuários por TimingAttack
     */
    const passwordToCompare = client ? client.password : uuid();

    const isPasswordIsValid = await bcrypt.compare(password, passwordToCompare);

    if (!isPasswordIsValid || !client) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    return {
      ...client,
      password: undefined,
    };
  }

  public async getToken(client: ClientFromJWT) {
    const payload = {
      id: client.id,
      email: client.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
