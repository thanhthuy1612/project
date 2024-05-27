import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { Chat } from 'src/models/ChatScheme';

@Injectable()
export class ChatService extends BaseService<Chat> {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: mongoose.Model<Chat>,
  ) {
    super(chatModel);
  }

  async create(chat: Chat): Promise<Chat> {
    try {
      const res = await this.chatModel.create({
        ...chat,
        createdAt: new Date(),
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error create account', HttpStatus.UNAUTHORIZED);
    }
  }
}
