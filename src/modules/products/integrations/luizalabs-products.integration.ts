import { ProductsIntegrationProductInterface } from '../interfaces/products-integration-product.interface';
import { ProductsIntegrationInterface } from '../interfaces/products-integration.interface';

import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LuizaLabsProductsIntegration
  implements ProductsIntegrationInterface
{
  constructor(private readonly httpService: HttpService) {}

  public async findById(
    productId: string,
  ): Promise<ProductsIntegrationProductInterface> {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(`product/${productId}/`),
      );

      /*
       * NOTE: Caso o retorno seja um array significa que o usuário passou um
       *  valor invalido
       */
      if (data.hasOwnProperty('products')) {
        return undefined;
      }

      return data;
    } catch (e) {
      return undefined;
    }
  }
}
