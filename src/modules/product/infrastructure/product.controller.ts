import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infrastructure/jwt-auth.guard';
import { ProductService } from '../application/product.service';
import { Product } from '../domain/product.entity';
import { CreateProductDto } from '../application/dto/create-product.dto';
import { UpdateProductDto } from '../application/dto/update-product.dto';
import { Auth } from '../../auth/infrastructure/auth.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard)  // Add this line to protect all routes in this controller
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth()
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Auth()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }
  @Auth()
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Auth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }

  @Auth()
  @Delete(':id/hard')
  async hardRemove(@Param('id') id: string): Promise<void> {
    return this.productService.hardRemove(id);
  }
}
