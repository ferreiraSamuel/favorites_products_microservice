import { ProductsModule } from './../../products/products.module';
import { AuthModule } from './../auth.module';
import { Test } from '@nestjs/testing';

describe('Module [Auth]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const authModule = await Test.createTestingModule({
      imports: [AuthModule, ProductsModule],
    }).compile();
    expect(authModule).toBeDefined();
  });
});
