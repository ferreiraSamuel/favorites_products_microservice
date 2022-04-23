import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { ProductsEntity } from './entities/produtcs.entity';
import { LuizaLabsProductsIntegration } from './integrations/luizalabs-products.integration';
import { ProductsIntegrationInterface } from './interfaces/products-integration.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity]), CommonModule],
  providers: [
    {
      provide: ProductsIntegrationInterface,
      useClass: LuizaLabsProductsIntegration,
    },
  ],
  exports: [TypeOrmModule, ProductsIntegrationInterface],
})
export class ProductsModule {}
