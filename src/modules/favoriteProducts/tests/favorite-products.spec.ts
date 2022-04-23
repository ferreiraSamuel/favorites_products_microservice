import { DatabaseModule } from './../../common/database/database.module';
import { CommonModule } from './../../common/common.module';
import { FavoriteProductsModule } from './../favoriteProducts.module';
import { Test } from '@nestjs/testing';

describe('Module [FavoriteProducts]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const favoritesModule = await Test.createTestingModule({
      imports: [FavoriteProductsModule, CommonModule, DatabaseModule],
    }).compile();

    expect(favoritesModule).toBeDefined();
  });
});
