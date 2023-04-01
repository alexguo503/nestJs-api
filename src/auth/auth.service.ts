import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { AuthEntity } from './entities/auth.entity';
import { comparePasswords, HashPassword } from '../helper/hashpassword';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

    if (!foundUser) {
      throw new BadRequestException(`Wrong credentials`);
    }

    const isMatch = await comparePasswords({
      password,
      hashPassword: foundUser.hashedPassword,
    });

    if (!isMatch) {
      throw new BadRequestException(`Wrong credentials`);
    }

    // if all passed, sign jwt and return to the user

    return '';
  }

  async signout() {
    return '';
  }
}
