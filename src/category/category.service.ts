import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const nameExists = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (nameExists)
      throw new HttpException('Category name exitsted', HttpStatus.FORBIDDEN);

    await this.categoryModel.create({ ...createCategoryDto });
    return { message: 'Create success', data: { ...createCategoryDto } };
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Id does not valid', HttpStatus.BAD_REQUEST);

    const categoryExists = await this.categoryModel.findById(id);

    if (!categoryExists)
      throw new HttpException('Category not exitsted', HttpStatus.FORBIDDEN);

    return categoryExists;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryExists = await this.findOne(id);

    await categoryExists.update({ ...updateCategoryDto });
    return { message: 'Update success', data: { ...updateCategoryDto } };
  }

  async remove(id: string) {
    const categoryExists = await this.findOne(id);

    await categoryExists.remove();

    return { message: 'Delete category sucess', id: categoryExists.id };
  }
}
