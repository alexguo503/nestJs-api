import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthEntity } from './entities/auth.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
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
  @Get('signout')
  signout(@Req() request: Request, @Res() response: Response) {
    return this.authService.signout(request, response);
  }
}
