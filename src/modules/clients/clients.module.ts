import { ClientEntity } from './entities/client.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), CommonModule],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService, TypeOrmModule],
})
export class ClientsModule {}
