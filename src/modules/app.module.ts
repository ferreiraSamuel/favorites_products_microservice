import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { FavoriteProductsModule } from './favoriteProducts/favorite-products.module';

@Module({
  imports: [AuthModule, ClientsModule, FavoriteProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
