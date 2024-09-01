import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './application/cart.service';
import { CartController } from './infrastructure/cart.controller';
import { CartItem } from './domain/cart.entity';
import { Product } from '../product/domain/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
