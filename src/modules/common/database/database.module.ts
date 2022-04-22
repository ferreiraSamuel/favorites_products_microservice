import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { AppSecretsInterface } from '../config/interfaces/app-secrets.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory({
        DATABASE: { DATABASE, PASSWORD, USER, PORT, HOST },
      }: AppSecretsInterface) {
        return {
          type: 'postgres',
          username: USER,
          password: PASSWORD,
          database: DATABASE,
          port: PORT,
          host: HOST,
          autoLoadEntities: true,
        };
      },
      inject: [AppSecretsInterface],
      imports: [ConfigModule],
    }),
  ],
})
export class DatabaseModule {}
