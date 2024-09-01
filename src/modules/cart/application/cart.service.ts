import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../domain/cart.entity';
import { User } from '../../user/domain/user.entity';
import { Product } from '../../product/domain/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addToCart(
    user: User,
    productId: string,
    quantity: number,
  ): Promise<CartItem> {
    console.log(
      `Adding to cart: user=${user.id}, productId=${productId}, quantity=${quantity}`,
    );

    let cartItem = await this.cartItemRepository.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
    });

    if (cartItem) {
      console.log('Cart item found, updating quantity');
      cartItem.quantity += quantity;
    } else {
      console.log('Cart item not found, creating new one');
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        console.log('Product not found');
        throw new NotFoundException('Product not found');
      }
      cartItem = this.cartItemRepository.create({ user, product, quantity });
    }

    return this.cartItemRepository.save(cartItem);
  }

  async removeFromCart(user: User, productId: string): Promise<void> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);
  }

  async getCart(user: User): Promise<CartItem[]> {
    return this.cartItemRepository.find({
      where: { user: { id: user.id } },
      relations: ['product'],
    });
  }

  async updateQuantity(
    user: User,
    productId: string,
    quantity: number,
  ): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = quantity;
    return this.cartItemRepository.save(cartItem);
  }
}
