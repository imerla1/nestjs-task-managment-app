import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredenialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredenialsDto: AuthCredenialsDto): Promise<void> {
    return this.authService.signUp(authCredenialsDto);
  }
  @Post('/signin')
  signIn(
    @Body() authCredenialsDto: AuthCredenialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredenialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
