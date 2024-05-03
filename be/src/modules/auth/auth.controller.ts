import { Body, Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/models/UserScheme';
import { AuthGuardCustom } from './auth.guard';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AuthGuard } from '@nestjs/passport';
import { getResponseData } from 'src/global/ultis';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    const result = await this.authService.register(user);
    return getResponseData(result);
  }

  @Post('login')
  async loginUser(
    @Body()
    user: LoginDto,
  ): Promise<ResponseData<any>> {
    const result = await this.authService.login(user);
    return getResponseData(result);
  }

  @Post('connect')
  async connectEmail(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return new ResponseData<User | string>(
      await this.authService.connect(user?.email),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Post('refresh')
  async refresh(
    @Body() body: { refresh: string },
  ): Promise<ResponseData<User>> {
    return new ResponseData<User>(
      await this.authService.refresh(body.refresh),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @UseGuards(AuthGuardCustom)
  @Post('logout')
  async logout(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return new ResponseData<User>(
      await this.authService.logout(user),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req): Promise<ResponseData<any>> {
    const token = await this.authService.googleLogin(req);
    return new ResponseData<any>(
      token,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }
}
