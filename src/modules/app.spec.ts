import { AppModule } from './app.module';
import { Test } from '@nestjs/testing';

describe('Module [App]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(appModule).toBeDefined();
  });
});
