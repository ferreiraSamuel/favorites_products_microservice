import { ClientInterface } from './interfaces/client.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>,
  ) {}

  public async getClient(id: number): Promise<ClientEntity> {
    const client: ClientInterface = await this.repository.findOne(id);

    if (!client) {
      throw new BadRequestException({
        statusCode: 404,
        message: 'Cliente não encontrado',
      });
    }

    return this.repository.findOne(id);
  }

  public async createClient(body: CreateClientDto): Promise<ClientEntity> {
    const client: ClientEntity = new ClientEntity();
    client.name = body.name;
    client.email = body.email;

    const emailAlreadyExists = await this.repository.findOne({
      email: client.email,
    });
    if (emailAlreadyExists) {
      throw new BadRequestException('Este email já está sendo usado.');
    }

    return this.repository.save(client);
  }

  public async updateClient(updateClientDto: UpdateClientDto) {
    const client: ClientInterface = await this.repository.findOne({
      id: updateClientDto.id,
    });

    return this.repository.update(
      {
        id: updateClientDto.id,
      },
      {
        email: updateClientDto.email || client.email,
        name: updateClientDto.name || client.name,
      },
    );
  }

  removeClient(id: number) {
    return this.repository.delete({
      id: id,
    });
  }
}
