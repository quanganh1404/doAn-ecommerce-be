import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private readonly productModel: Model<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async refillProduct() {
    const products = await this.findAll();
    products.forEach(async (product) => {
      const productQuantity: number = parseInt(product.countInStock);

      if (!(productQuantity > 0)) await product.update({ countInStock: +10 });
      else await product.update({ countInStock: productQuantity + 10 });
    });

    return { message: 'Refill success' };
  }

  async create(createProductDto: CreateProductDto) {
    const { name, slug, categoryId } = createProductDto;

    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw new HttpException(
        'Category id does not valid',
        HttpStatus.BAD_REQUEST,
      );

    await this.categoryService.findOne(categoryId);

    if (!slug)
      createProductDto.slug = name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

    await this.productModel.create({
      ...createProductDto,
      nameLowerCase: createProductDto.name.toLowerCase(),
    });

    return {
      message: 'Create success',
      data: {
        ...createProductDto,
      },
    };
  }

  async findAll() {
    return await this.productModel.find();
  }

  async sortBy(sort: string, orderBy: number) {
    let result;
    if (sort == 'price')
      result = await this.productModel.find().sort({ price: orderBy });

    if (sort == 'rating')
      result = await this.productModel.find().sort({ rating: orderBy });
    if (sort == 'countInStock')
      result = await this.productModel.find().sort({ countInStock: orderBy });

    return result;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Id does not valid', HttpStatus.BAD_REQUEST);

    const product = await this.productModel.findById(id);

    if (!product)
      throw new HttpException('Không tìm thấy sản phẩm', HttpStatus.FORBIDDEN);

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.productModel.findOne({ slug: slug });
    if (!product)
      throw new HttpException('Không tìm thấy sản phẩm', HttpStatus.FORBIDDEN);
    return product;
  }

  async searchByName(name: string) {
    const findProduct = await this.productModel.find({
      nameLowerCase: { $regex: name.toLowerCase() },
    });

    return findProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { name } = updateProductDto;
    const product = await this.findOne(id);
    if (name) {
      updateProductDto.slug = name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      updateProductDto.nameLowerCase = name.toLowerCase();
    }

    await product.update({ ...updateProductDto });
    return {
      message: 'Cập nhập sản phẩm thành công',
      data: { ...updateProductDto },
    };
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    await product.remove();
    return { message: 'Xóa tài sản phẩm công', data: { id: id } };
  }

  async findProductByCategoryId(categoyId: string) {
    const categoryExists = await this.categoryService.findOne(categoyId);

    const product = await this.productModel.find({ categoryId: categoyId });

    return { categoryName: categoryExists.name, data: product };
  }
}
