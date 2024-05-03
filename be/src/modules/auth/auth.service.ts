import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/UserScheme';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(user: User): Promise<any> {
    try {
      const users = await this.userService.create(user);

      if (typeof users === 'string') {
        return users;
      }
      const token = await this._createToken(users);
      return { username: users.username, email: users.email, ...token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(user: LoginDto): Promise<any> {
    try {
      const users = await this.userService.findLogin(user);

      if (typeof users === 'string') {
        return users;
      }

      const token = await this._createToken(users, false, user.isRemember);

      return { username: users.username, email: users.email, ...token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async connect(email: string): Promise<any> {
    try {
      const users = await this.userService.connectEmail(email);

      if (typeof users === 'string') {
        return users;
      }

      const token = await this._createToken(users);

      return { username: users.username, email, ...token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  private async _createToken(
    user: User,
    isSecondFactorAuthenticated = false,
    refresh = true,
  ) {
    const accessToken = await this.jwtService.signAsync(
      {
        email: user.email,
        isSecondFactorAuthenticated,
      },
      {
        secret: process.env.SECRETKEY,
        expiresIn: `${process.env.EXPIRESIN}h`,
      },
    );

    if (refresh) {
      const refreshToken = await this.jwtService.signAsync(
        { email: user.email },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: `${process.env.EXPIRESIN_REFRESH}s`,
        },
      );
      await this.userService.update(user._id, { refreshToken });
      return {
        accessToken,
        refreshToken,
      };
    } else {
      return {
        accessToken,
      };
    }
  }

  async validateEmail(email: string): Promise<User> {
    return await this.userService.checkByEmail(email);
  }

  async getAccess2FA(user: User) {
    return this._createToken(user, true);
  }

  async refresh(refresh_token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.SECRETKEY_REFRESH,
      });
      const user = await this.userService.checkByEmail(payload.email);

      if (user.refreshToken !== refresh_token) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const token = await this._createToken(user, true, false);
      return { email: user.email, token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(user: User): Promise<User> {
    try {
      return await this.userService.findAndUpdateByEmail(user.email);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async googleLogin(req): Promise<any> {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
