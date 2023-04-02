import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthEntity } from '../auth/entities/auth.entity';

import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 以下用来保护Api资源, cookie不含token的用户无法访问
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ status: 200, type: AuthEntity, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  async findAllUsers(): Promise<{ id: string; email: string }[]> {
    return await this.usersService.findAllUsers();
  }

  @ApiOkResponse({
    status: 200,
    type: AuthEntity,
    description: 'find user by Id',
  })
  @ApiNotFoundResponse()
  @Get(':id')
  // @Param('id') 获得的id格式是string, 可通过ParseIntPipe处理为number
  async findUserById(@Param('id') id: string, @Req() req): Promise<AuthEntity> {
    // console.log('--->', typeof id);

    const user = await this.usersService.findUserById(id, req);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }

  @ApiOkResponse({ type: AuthEntity })
  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<AuthEntity> {
    return this.usersService.removeUser(id);
  }
}
