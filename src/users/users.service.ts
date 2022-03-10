import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<Product>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, role, email } = createUserDto;

    const userExists = await this.userModel.findOne({
      email: email,
    });

    if (userExists)
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

    if (!role) createUserDto.role = 'CUSTOMER';

    createUserDto.password = await bcrypt.hash(password, 10);

    await this.userModel.create({ ...createUserDto });
    return { message: 'Create account success', data: { ...createUserDto } };
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Mongo id not right', HttpStatus.BAD_REQUEST);

    const user = await this.userModel.findById(id);

    if (!user)
      throw new HttpException('Account not exists', HttpStatus.FORBIDDEN);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    await user.updateOne({ ...updateUserDto });
    return {
      message: 'Update account success',
      data: { id: user._id, ...updateUserDto },
    };
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return { message: 'Delete account success', data: { id: user._id } };
  }
}
