import { ClientEntity } from './entities/client.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), CommonModule],
})
export class ClientsModule {}
