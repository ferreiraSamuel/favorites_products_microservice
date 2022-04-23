import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientInterface } from './interfaces/client.interface';

@ApiTags('Clientes')
@Controller('client')
export class ClientsController {
  @Inject(ClientsService)
  private readonly service: ClientsService;

  @Post()
  @ApiBody({ type: CreateClientDto })
  public createClient(@Body() body: CreateClientDto): Promise<ClientInterface> {
    return this.service.createClient(body);
  }
}
