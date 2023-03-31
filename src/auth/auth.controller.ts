import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiCreatedResponse()
  @Post('signin')
  signin() {
    return this.authService.signin();
  }

  @ApiOkResponse()
  @Get('signout')
  signout() {
    return this.authService.signout();
  }
}
