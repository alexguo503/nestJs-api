import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
// import { AuthEntity } from './entities/auth.entity';

import { comparePasswords, HashPassword, signToken } from '../utils/helper';

import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt/dist';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Request, Response } from 'express';

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

  async signin(dto: AuthDto, req: Request, res: Response) {
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

    // if 用户存在且密码match, 服务端则会返回token
    const token = await signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    console.log('token: ', token);

    if (!token) {
      throw new ForbiddenException();
    }

    // 客户端存储 token by cookie
    res.cookie('token', token);

    return res.send({ message: 'Logged in successfully' });
  }

  async signout(req: Request, res: Response) {
    // 客户端删除token by cookie
    res.clearCookie('token');

    return res.send({ message: 'Logged out successfully' });
  }
}
