import { CommonModule } from './common.module';
import { Test } from '@nestjs/testing';

describe('Module [Common]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const commonModule = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();

    expect(commonModule).toBeDefined();
  });
});
