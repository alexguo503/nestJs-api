import { IsDate, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { User } from '@prisma/client';

export class AuthEntity implements User {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  hashedPassword: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
