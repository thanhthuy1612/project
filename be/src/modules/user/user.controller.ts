import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/models/UserScheme';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AuthGuard } from '@nestjs/passport';
import { getResponseData } from 'src/global/utils';
import { ChangeEmailDto, ChangePasswordDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUser(): Promise<ResponseData<User>> {
    return new ResponseData<User>(
      await this.userService.findAll(),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<ResponseData<User>> {
    return new ResponseData<User>(
      await this.userService.findById(id),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('email')
  async getUserByEmail(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    const result = await this.userService.findByEmail(user.email);
    return getResponseData(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('username')
  async updateUserByUsername(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    const result = await this.userService.findAndUpdate(user);
    return getResponseData(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('chats')
  async getChats(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    const result = await this.userService.findMessageByEmail(user?.email);
    return getResponseData(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change/password')
  async updatePassword(
    @Body()
    user: ChangePasswordDto,
  ): Promise<ResponseData<any>> {
    const result = await this.userService.changePassword(user);
    return getResponseData(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change/email')
  async updateEmail(
    @Body()
    user: ChangeEmailDto,
  ): Promise<ResponseData<any>> {
    const result = await this.userService.changeEmail(user);
    return getResponseData(result);
  }

  @Put(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    user: User,
  ): Promise<ResponseData<User>> {
    return new ResponseData<User>(
      await this.userService.update(id, user),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<ResponseData<User>> {
    return new ResponseData<User>(
      await this.userService.delete(id),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }
}
