import { ClientFromJWT } from './../interfaces/client-from-jwt.interface';
import { ClientInterface } from './../../clients/interfaces/client.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: ClientInterface): Promise<ClientFromJWT> {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
