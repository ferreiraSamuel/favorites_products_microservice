import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppSecretsInterface } from '../interfaces/app-secrets.interface';

@Injectable()
export class DotenvSecretsService implements AppSecretsInterface {
  constructor(protected readonly config: ConfigService) {}

  DATABASE = {
    DATABASE: this.config.get('DATABASE_NAME'),
    USER: this.config.get('DATABASE_USER'),
    PASSWORD: this.config.get('DATABASE_PASSWORD'),
    PORT: Number(this.config.get('DATABASE_PORT')),
    HOST: this.config.get('DATABASE_HOST'),
  };
}
