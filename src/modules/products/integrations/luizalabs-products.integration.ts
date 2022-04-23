import { ProductsIntegrationProductInterface } from '../interfaces/products-integration-product.interface';
import { ProductsIntegrationInterface } from '../interfaces/products-integration.interface';

export class LuizaLabsProductsIntegration
  implements ProductsIntegrationInterface
{
  public async findById(
    productId: string,
  ): Promise<ProductsIntegrationProductInterface[]> {
    return [];
  }
}
