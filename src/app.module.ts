import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductModule],
})
export class AppModule {}
