import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientsService } from './../services/clients.service';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto } from './../dto/create-client.dto';
import { ClientInterface } from './../interfaces/client.interface';

@ApiTags('Clientes')
@Controller('client')
export class ClientsController {
  @Inject(ClientsService)
  private readonly service: ClientsService;

  @Post()
  @ApiBody({ type: CreateClientDto })
  @ApiOperation({
    summary: 'Cadastra cliente',
  })
  public createClient(@Body() body: CreateClientDto): Promise<ClientInterface> {
    return this.service.createClient(body);
  }
}
