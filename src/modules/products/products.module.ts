import { ProductService } from './services/products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from '../common/common.module';
import { ProductsEntity } from './entities/produtcs.entity';
import { LuizaLabsProductsIntegration } from './integrations/luizalabs-products.integration';
import { ProductsIntegrationInterface } from './interfaces/products-integration.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity]),
    CommonModule,
    HttpModule.register({
      baseURL: 'http://challenge-api.luizalabs.com/api/',
    }),
  ],
  providers: [
    {
      provide: ProductsIntegrationInterface,
      useClass: LuizaLabsProductsIntegration,
    },
    ProductService,
  ],
  exports: [TypeOrmModule, ProductsIntegrationInterface, ProductService],
})
export class ProductsModule {}
