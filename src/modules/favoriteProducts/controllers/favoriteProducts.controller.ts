import { ClientFromJWT } from './../../auth/interfaces/client-from-jwt.interface';
import { CurrentClient } from './../../auth/decorators/current-client.decorator';
import { FavoriteProductsService } from './../services/favoriteProducts.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Protected } from './../../auth/decorators/protected.decorator';
import { Controller, Get, Post, Delete, Param } from '@nestjs/common';

@ApiTags('Produtos Favoritos')
@Controller({ path: 'favoritesProducts' })
export class FavoriteProductsController {
  constructor(
    private readonly favoriteProductsService: FavoriteProductsService,
  ) {}

  @Get()
  @Protected()
  public async getClientFavorites(@CurrentClient() client: ClientFromJWT) {
    return this.favoriteProductsService.getFavorites(client.id);
  }

  @Post(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @Protected()
  public async favoriteProduct(
    @CurrentClient() client: ClientFromJWT,
    @Param('id') productId: string,
  ) {
    return this.favoriteProductsService.favorite(productId, client.id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @Protected()
  public async unfavoriteProduct(
    @CurrentClient() client: ClientFromJWT,
    @Param('id') productId: string,
  ) {
    return this.favoriteProductsService.unfavorite(productId, client.id);
  }
}
