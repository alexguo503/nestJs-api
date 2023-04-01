import { Injectable } from '@nestjs/common';
import { AuthEntity } from '../auth/entities/auth.entity';
import { PrismaService } from '../../prisma/prisma.service';

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

  async findUserById(id: string): Promise<AuthEntity> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async removeUser(id: string): Promise<AuthEntity> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
