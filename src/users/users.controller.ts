import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthEntity } from '../auth/entities/auth.entity';

import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  async findUserById(@Param('id') id: string): Promise<AuthEntity> {
    // console.log('--->', typeof id);

    const user = await this.usersService.findUserById(id);
    // console.log('findUserById users user: ', user);

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
