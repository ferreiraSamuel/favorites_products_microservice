import { FavoriteProductsModule } from './../favorite-products.module';
import { Test } from '@nestjs/testing';

describe('Module [FavoriteProducts]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const favoritesModule = await Test.createTestingModule({
      imports: [FavoriteProductsModule],
    }).compile();

    expect(favoritesModule).toBeDefined();
  });
});
