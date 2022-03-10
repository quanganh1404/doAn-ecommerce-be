import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './model/products.model';
import { CategorySchema } from 'src/category/model/category.model';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CategoryService],
})
export class ProductsModule {}
