import { ClientFromJWT } from './../../auth/interfaces/client-from-jwt.interface';
import { CurrentClient } from './../../auth/decorators/current-client.decorator';
import { FavoriteProductsService } from './../services/favorite-products.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Protected } from './../../auth/decorators/protected.decorator';
import { Controller, Get, Post, Delete, Param } from '@nestjs/common';

@ApiTags('Produtos Favoritos')
@Controller({ path: 'favoritesProducts' })
export class FavoriteProductsController {
  constructor(
    private readonly favoriteProductsService: FavoriteProductsService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      'Retorna todos os produtos favoritos relacionados com o cliente autenticado (access_token retornado no endpoint de login).',
  })
  @Protected()
  public async getClientFavorites(@CurrentClient() client: ClientFromJWT) {
    return this.favoriteProductsService.getFavorites(client.id);
  }

  @Post(':id')
  @ApiOperation({
    summary:
      'Favorita um produto relacionando com o cliente autenticado (access_token retornado no endpoint de login). ',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '4bd442b1-4a7d-2475-be97-a7b22a08a024',
    description: 'Usar o ID do produto',
  })
  @Protected()
  public async favoriteProduct(
    @CurrentClient() client: ClientFromJWT,
    @Param('id') productId: string,
  ) {
    return this.favoriteProductsService.favorite(productId, client.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Remove um produto da lista de favoritados relacionado com o cliente autenticado (access_token retornado no endpoint de login).',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '4bd442b1-4a7d-2475-be97-a7b22a08a024',
    description: ' Usar o ID do produto',
  })
  @Protected()
  public async unfavoriteProduct(
    @CurrentClient() client: ClientFromJWT,
    @Param('id') productId: string,
  ) {
    return this.favoriteProductsService.unfavorite(productId, client.id);
  }
}
