import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  shippingAdress: {
    fullName: string;
    address: string;
    street: string;
    city: string;
    phoneNum: number;
  };

  createdAt?: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  orderItems: {
    productId: string;
    price: number;
    quantity: number;
    rating?: number;
  }[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shippingPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  taxPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
