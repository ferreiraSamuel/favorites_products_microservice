import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './../entities/produtcs.entity';
import { Repository } from 'typeorm';
import { ProductsIntegrationProductInterface } from './../interfaces/products-integration-product.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
  ) {}

  public async saveByIntegration(product: ProductsIntegrationProductInterface) {
    const savedProduct = await this.productRepository.findOne({
      where: { externalId: product.id },
    });

    if (savedProduct) {
      await this.productRepository.update(savedProduct.id, {
        ...savedProduct,
        id: savedProduct.id,
        externalId: product.id,
      });
      return savedProduct;
    }

    return this.productRepository
      .create({
        ...product,
        id: undefined,
        externalId: product.id,
      })
      .save();
  }
}
