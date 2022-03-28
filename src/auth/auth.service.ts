import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user: any = await this.usersService.findUserByEmail(
      loginAuthDto.email,
    );

    if (!user)
      throw new HttpException(
        'Email or password wrong',
        HttpStatus.BAD_REQUEST,
      );

    const bcryptCheck = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );

    if (!bcryptCheck) {
      throw new HttpException(
        'Email or password wrong',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.status == 'ONLINE') {
      throw new HttpException(
        'You are online on another device please logout',
        HttpStatus.BAD_REQUEST,
      );
    }

    await user.updateOne({ status: 'ONLINE' });

    const { password, status, ...rest } = user._doc;
    return rest;
  }

  async logout(id: string) {
    const user = await this.usersService.findOne(id);

    await user.updateOne({ status: 'OFFLINE' });
    return { message: 'Logout success' };
  }
}
