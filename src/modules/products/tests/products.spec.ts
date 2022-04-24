import { ProductsModule } from './../products.module';
import { Test } from '@nestjs/testing';

describe('Module [Products]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const productsModule = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    expect(productsModule).toBeDefined();
  });
});
