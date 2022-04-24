import { UpdateClientDto } from './../../clients/dto/update-client.dto';
import { ClientFromJWT } from './../interfaces/client-from-jwt.interface';
import { ClientsService } from './../../clients/services/clients.service';
import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { Protected } from '../decorators/protected.decorator';
import { CurrentClient } from '../decorators/current-client.decorator';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller({
  path: 'me',
})
@ApiTags('Perfil')
export class ProfileController {
  constructor(private readonly clientsService: ClientsService) {}

  @Protected()
  @Get()
  @ApiOperation({
    summary:
      'Retorna as informações do cadastro do cliente autenticado (access_token retornado no endpoint de login)',
  })
  public async getDetails(@CurrentClient() client: ClientFromJWT) {
    return this.clientsService.getClient(client.id);
  }

  @Protected()
  @Patch()
  @ApiBody({ type: UpdateClientDto })
  @ApiOperation({
    summary:
      'Atualiza as informações de cadastro do cliente autenticado (access_token retornado no endpoint de login)',
  })
  public async update(
    @CurrentClient() client: ClientFromJWT,
    @Body() body: UpdateClientDto,
  ) {
    return this.clientsService.updateClient(client, body);
  }

  @Protected()
  @Delete()
  @ApiOperation({
    summary:
      'Deleta o cliente da base de dados do cliente autenticado (access_token retornado no endpoint de login)',
  })
  public async delete(@CurrentClient() client: ClientFromJWT) {
    return this.clientsService.removeClient(client.id);
  }
}
