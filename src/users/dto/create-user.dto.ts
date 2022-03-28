import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  phoneNum: number;

  @ApiProperty()
  @IsEnum(['ONLINE', 'OFFLINE'])
  status: string;

  @ApiProperty()
  @IsEnum(['ADMIN', 'CUSTOMER'])
  role: string;
}
