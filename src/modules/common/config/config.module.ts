import { DotenvSecretsService } from './services/dotenv-secrets.service';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { AppSecretsInterface } from './interfaces/app-secrets.interface';

@Module({
  imports: [NestConfig.forRoot()],
  providers: [
    {
      provide: AppSecretsInterface,
      useClass: DotenvSecretsService,
    },
  ],
  exports: [AppSecretsInterface],
})
export class ConfigModule {}
