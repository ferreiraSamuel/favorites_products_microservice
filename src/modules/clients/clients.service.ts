import { ClientFromJWT } from './../auth/interfaces/client-from-jwt.interface';
import { ClientInterface } from './interfaces/client.interface';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>,
  ) {}

  public async getClient(id: number): Promise<ClientInterface> {
    const client = await this.repository.findOne({
      select: ['id', 'email', 'name'],
      where: { id },
    });

    if (!client) {
      throw new BadRequestException({
        statusCode: 404,
        message: 'Cliente não encontrado',
      });
    }

    return client;
  }

  public async getClientByEmail(
    email: string,
    select: Array<keyof ClientInterface>,
  ): Promise<ClientInterface> {
    return this.repository.findOne({
      select,
      where: { email },
    });
  }

  public async createClient(body: CreateClientDto): Promise<ClientInterface> {
    const client: ClientEntity = new ClientEntity();
    client.name = body.name;
    client.email = body.email;
    client.password = await bcrypt.hash(body.newPassword, 10);

    const emailAlreadyExists = await this.repository.findOne({
      email: client.email,
    });

    if (emailAlreadyExists) {
      throw new BadRequestException('Este email já está sendo usado.');
    }

    const createdClient = await this.repository.save(client);

    return { ...createdClient, password: undefined };
  }

  public async updateClient(
    currentClient: ClientFromJWT,
    updateClientDto: UpdateClientDto,
  ) {
    const client: ClientInterface = await this.repository.findOne({
      id: currentClient.id,
    });

    if (!client) {
      throw new BadRequestException('Cliente não encontrado');
    }

    return this.repository.update(
      {
        id: currentClient.id,
      },
      {
        email: updateClientDto.email || client.email,
        name: updateClientDto.name || client.name,
        password: updateClientDto.newPassword
          ? await bcrypt.hash(updateClientDto.newPassword, 10)
          : client.password,
      },
    );
  }

  public removeClient(id: number) {
    return this.repository.delete({
      id: id,
    });
  }
}
