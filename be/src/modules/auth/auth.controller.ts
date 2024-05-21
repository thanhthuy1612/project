import { Body, Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/models/UserScheme';
import { AuthGuardCustom } from './auth.guard';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AuthGuard } from '@nestjs/passport';
import { getResponseData } from 'src/global/utils';
import { LoginDto } from './auth.dto';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

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

  @Post('/google')
  async login(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const data = await this.authService.loginGoogle({
      email: payload.email,
    });
    return new ResponseData<any>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
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
