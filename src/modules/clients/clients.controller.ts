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
import { ClientEntity } from './entities/client.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientInterface } from './interfaces/client.interface';

@ApiTags('Clientes')
@Controller('client')
export class ClientsController {
  @Inject(ClientsService)
  private readonly service: ClientsService;

  @Get(':id')
  public getClient(@Param('id', ParseIntPipe) id: number) {
    return this.service.getClient(id);
  }

  @Post()
  @ApiBody({ type: CreateClientDto })
  public createClient(@Body() body: CreateClientDto): Promise<ClientInterface> {
    return this.service.createClient(body);
  }

  @Put()
  @ApiBody({ type: UpdateClientDto })
  public updateClient(@Body() body: UpdateClientDto) {
    return this.service.updateClient({
      id: body.id,
      email: body.email,
      name: body.name,
      newPassword: body.newPassword,
      currentPassword: body.currentPassword,
    });
  }

  @Delete(':id')
  public removeClient(@Param('id') id: string) {
    return this.service.removeClient(parseInt(id));
  }
}
