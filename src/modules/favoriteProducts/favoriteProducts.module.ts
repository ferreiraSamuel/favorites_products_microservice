import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { FavoriteProductsController } from './controllers/favoriteProducts.controller';
import { ProductsEntity } from './entities/produtcs.entity';
import { FavoriteProductsService } from './services/favoriteProducts.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity]), CommonModule],
  controllers: [FavoriteProductsController],
  providers: [FavoriteProductsService],
})
export class FavoriteProductsModule {}
