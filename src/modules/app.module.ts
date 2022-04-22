import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [AuthModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
