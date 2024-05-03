import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/models/UserScheme';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { GoogleStrategy } from './passport/google.strategy';
import { configDotenv } from 'dotenv';

configDotenv();
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: `${process.env.EXPIRESIN}h` },
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
