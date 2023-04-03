import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthEntity } from './entities/auth.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  // constructor 是一种用于创建和初始化class创建的对象的特殊方法
  // constructor(AuthService), 然后就能使用 this.authService.xxx 调用 AuthService里的function
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ status: 201, type: AuthEntity })
  @Post('signup')
  signup(@Body() dto: AuthDto): Promise<{ message: string }> {
    return this.authService.signup(dto);
  }

  @ApiCreatedResponse({ status: 201, type: AuthEntity })
  @Post('signin')
  signin(
    @Body() dto: AuthDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.authService.signin(dto, request, response);
  }

  @ApiOkResponse()
  @Post('signout')
  signout(@Req() request: Request, @Res() response: Response) {
    return this.authService.signout(request, response);
  }

  @ApiOkResponse()
  @Post('refresh')
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
