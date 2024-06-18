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
import { AuthGuard } from '@nestjs/passport';
import { getResponseData } from 'src/global/utils';
import { ChangeEmailDto, ChangePasswordDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUser(): Promise<ResponseData<User>> {
    const result = await this.userService.findAll();
    return getResponseData(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<ResponseData<User>> {
    const result = await this.userService.findById(id);
    return getResponseData(result);
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
  @Get('search/:item')
  async search(
    @Param('item')
    item: string,
  ): Promise<ResponseData<User>> {
    const result = await this.userService.search(item);
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
    const result = await this.userService.update(id, user);
    return getResponseData(result);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<ResponseData<User>> {
    const result = await this.userService.delete(id);
    return getResponseData(result);
  }
}
