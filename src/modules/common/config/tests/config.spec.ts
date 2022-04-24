import { ConfigModule } from './../config.module';
import { Test } from '@nestjs/testing';

describe('Module [Config]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const configModule = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();

    expect(configModule).toBeDefined();
  });
});
