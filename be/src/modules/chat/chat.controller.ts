import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JoinChatDto } from './chat.dto';
import { ChatService } from './chat.service';
import { ResponseData } from 'src/global/globalClass';
import { Chat } from 'src/models/ChatScheme';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/join')
  async joinChat(@Body() joinChatDto: JoinChatDto) {
    return this.chatService.findById(joinChatDto.id);
  }

  @Get()
  async getAll(): Promise<ResponseData<Chat>> {
    return new ResponseData<Chat>(
      await this.chatService.findAll(),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Put(':id')
  async updateChat(
    @Param('id')
    id: string,
    @Body()
    chat: Chat,
  ): Promise<ResponseData<Chat>> {
    return new ResponseData<Chat>(
      await this.chatService.update(id, chat),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Delete(':id')
  async deleteChat(
    @Param('id')
    id: string,
  ): Promise<ResponseData<Chat>> {
    return new ResponseData<Chat>(
      await this.chatService.delete(id),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }
}
