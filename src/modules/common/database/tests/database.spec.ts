import { DatabaseModule } from './../database.module';
import { Test } from '@nestjs/testing';

describe('Module [Database]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const databaseModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    expect(databaseModule).toBeDefined();
  });
});
