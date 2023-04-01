import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { AuthEntity } from './entities/auth.entity';

import { comparePasswords, HashPassword, signToken } from '../utils/helper';

import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException(`${foundUser} already exists`);
    }

    const hashedPassword = await HashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return { message: 'signup was successfull' };
  }

  async signin(dto: AuthDto) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    console.log('foundUser: ', foundUser);

    if (!foundUser) {
      throw new BadRequestException(`Wrong credentials`);
    }

    const isMatch = await comparePasswords({
      password,
      hashPassword: foundUser.hashedPassword,
    });

    console.log('isMatch: ', isMatch);

    if (!isMatch) {
      throw new BadRequestException(`Wrong credentials`);
    }

    // if all passed, sign jwt and return to the user
    const token = await signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    console.log('token: ', token);

    return { token };
  }

  async signout() {
    return '';
  }
}
