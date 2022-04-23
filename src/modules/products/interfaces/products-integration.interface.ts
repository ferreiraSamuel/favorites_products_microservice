import { ProductsIntegrationProductInterface } from './products-integration-product.interface';

export abstract class ProductsIntegrationInterface {
  abstract findById(
    productId: string,
  ): Promise<ProductsIntegrationProductInterface>;
}
