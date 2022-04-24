import { ProductsModule } from './../../products/products.module';
import { ClientsModule } from './../clients.module';
import { Test } from '@nestjs/testing';
import { ClientsService } from '../services/clients.service';

describe('Module [Clients]', () => {
  it('deve compilar o modulo com sucesso', async () => {
    const clientsModule = await Test.createTestingModule({
      imports: [ClientsModule, ProductsModule],
    }).compile();
    expect(clientsModule).toBeDefined();
    expect(clientsModule.get(ClientsService)).toBeInstanceOf(ClientsService);
  });
});
