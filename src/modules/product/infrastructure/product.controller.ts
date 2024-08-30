import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from '../application/product.service';
import { Product } from '../domain/product.entity';
import { CreateProductDto } from '../application/dto/create-product.dto';
import { UpdateProductDto } from '../application/dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }

  @Delete(':id/hard')
  async hardRemove(@Param('id') id: string): Promise<void> {
    return this.productService.hardRemove(id);
  }
}
