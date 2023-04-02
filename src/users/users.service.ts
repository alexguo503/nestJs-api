import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthEntity } from '../auth/entities/auth.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<{ id: string; email: string }[]> {
    // 返回 user 所有信息, 包括 id, email, password ...
    // return await this.prisma.user.findMany();

    // 仅返回 user id email
    return await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }

  async findUserById(id: string, req: Request): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    // 以下失败, decodedUser = undefined ...
    // 用户 jwt payload的id 与 所查询 user.id一致时, 才能访问, 即只能访问自己的ID用户信息
    // const decodedUser = req.user as { id: string, email: string };
    // if (user.id !== decodedUser.id) {
    //   throw new ForbiddenException();
    // }

    // 不显示 Password
    // delete user.hashedPassword;

    return user;
  }

  async removeUser(id: string): Promise<AuthEntity> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
