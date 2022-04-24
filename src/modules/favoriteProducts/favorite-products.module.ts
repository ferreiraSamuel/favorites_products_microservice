import { ProductsModule } from './../products/products.module';
import { ClientsModule } from './../clients/clients.module';
import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { FavoriteProductsController } from './controllers/favorite-products.controller';
import { FavoriteProductsService } from './services/favorite-products.service';

@Module({
  imports: [CommonModule, ClientsModule, ProductsModule],
  controllers: [FavoriteProductsController],
  providers: [FavoriteProductsService],
})
export class FavoriteProductsModule {}
