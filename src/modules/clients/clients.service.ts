import { ClientInterface } from './interfaces/client.interface';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>,
  ) {}

  public async getClient(id: number): Promise<ClientEntity> {
    const client: ClientInterface = await this.repository.findOne({
      select: ['id', 'email', 'name'],
      where: { id },
    });

    if (!client) {
      throw new BadRequestException({
        statusCode: 404,
        message: 'Cliente não encontrado',
      });
    }

    return this.repository.findOne({
      select: ['id', 'email', 'name'],
      where: { id },
    });
  }

  public async createClient(body: CreateClientDto): Promise<ClientInterface> {
    const client: ClientEntity = new ClientEntity();
    client.name = body.name;
    client.email = body.email;
    client.password = await bcrypt.hash(body.newPassword, 10);

    const emailAlreadyExists = await this.repository.findOne({
      email: client.email,
    });

    if (emailAlreadyExists) {
      throw new BadRequestException('Este email já está sendo usado.');
    }

    const createdClient = await this.repository.save(client);

    return { ...createdClient, password: undefined };
  }

  public async updateClient(updateClientDto: UpdateClientDto) {
    const client: ClientInterface = await this.repository.findOne({
      id: updateClientDto.id,
    });

    if (!client) {
      throw new BadRequestException('Cliente não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      updateClientDto.currentPassword,
      client.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha atual inválida');
    }

    return this.repository.update(
      {
        id: updateClientDto.id,
      },
      {
        email: updateClientDto.email || client.email,
        name: updateClientDto.name || client.name,
        password: await bcrypt.hash(updateClientDto.newPassword, 10),
      },
    );
  }

  public removeClient(id: number) {
    return this.repository.delete({
      id: id,
    });
  }
}
