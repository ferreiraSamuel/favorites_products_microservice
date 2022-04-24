import { ProductService } from './../../products/services/products.service';
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
    private readonly productService: ProductService,
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

    const alreadyHasFavorite = client.favorites.some(
      (favorite) => favorite.externalId === productId,
    );

    if (alreadyHasFavorite) {
      throw new BadRequestException(
        'Esse produto já está na sua lista de favoritos',
      );
    }

    const product = await this.productIntegration.findById(productId);

    if (!product) {
      throw new BadRequestException('Produto não encontrado!');
    }

    const savedProduct = await this.productService.saveByIntegration(product);

    const favorites = client.favorites;
    favorites.push(savedProduct);

    await client.save({
      data: { favorites },
    });

    return {
      success: true,
      message: 'Produto salvo com sucesso!',
    };
  }

  public async unfavorite(productId: string, clientId: number) {
    const client = await this.clientRepository.findOne(clientId, {
      relations: ['favorites'],
    });

    if (!client) {
      throw new BadRequestException('Cliente Inválido');
    }

    try {
      client.favorites = client.favorites.filter(
        (product) => product.externalId !== productId,
      );

      await client.save();

      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
      };
    }
  }
}
