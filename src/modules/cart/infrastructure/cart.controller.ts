import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infrastructure/jwt-auth.guard';
import { CartService } from '../application/cart.service';
import { GetUser } from '../../auth/infrastructure/user.decorator';
import { User } from '../../user/domain/user.entity';
import { AddToCartDto } from '../application/dto/add-to-cart.dto';
import { UpdateQuantityDto } from '../application/dto/update-quantity.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('add')
  async addToCart(@GetUser() user: User, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(
      user,
      addToCartDto.productId,
      addToCartDto.quantity,
    );
  }

  @Delete('remove/:productId')
  async removeFromCart(
    @GetUser() user: User,
    @Param('productId') productId: string,
  ) {
    await this.cartService.removeFromCart(user, productId);
    return { message: 'Item removed from cart' };
  }

  @Get()
  async getCart(@GetUser() user: User) {
    return this.cartService.getCart(user);
  }

  @Patch('update/:productId')
  async updateQuantity(
    @GetUser() user: User,
    @Param('productId') productId: string,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    return this.cartService.updateQuantity(
      user,
      productId,
      updateQuantityDto.quantity,
    );
  }
}
