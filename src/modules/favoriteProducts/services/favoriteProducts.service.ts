import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './../../clients/entities/client.entity';
import { Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductsIntegrationInterface } from '../../products/interfaces/products-integration.interface';

@Injectable()
export class FavoriteProductsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly productIntegration: ProductsIntegrationInterface,
  ) {}
  public async getFavorites(clientId: number) {
    const client = await this.clientRepository.findOne(clientId, {
      relations: ['favorites'],
    });

    if (!client) {
      throw new BadRequestException('Cliente Inválido');
    }

    return client.favorites;
  }

  public async favorite(productId: string, clientId: number) {
    const client = await this.clientRepository.findOne(clientId, {
      relations: ['favorites'],
    });

    if (!client) {
      throw new BadRequestException('Cliente Inválido');
    }

    const product = await this.productIntegration.findById(productId);

    if (!product) {
      throw new BadRequestException('Produto não encontrado!');
    }
    // return client.favorites;
  }
}
