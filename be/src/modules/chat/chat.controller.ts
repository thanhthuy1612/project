import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ChatDTO,
  JoinChatDto,
  SearchChatsDTO,
  SearchMessageDTO,
} from './chat.dto';
import { ChatService } from './chat.service';
import { ResponseData } from 'src/global/globalClass';
import { Chat } from 'src/models/ChatScheme';
import { getResponseData } from 'src/global/utils';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('join')
  async joinChat(@Body() joinChatDto: JoinChatDto) {
    const result = await this.chatService.findById(joinChatDto.id);
    return getResponseData(result);
  }

  @Get()
  async getAll(): Promise<ResponseData<Chat>> {
    const result = await this.chatService.findAll();
    return getResponseData(result);
  }

  @Put(':id')
  async updateChat(
    @Param('id')
    id: string,
    @Body()
    chat: Chat,
  ): Promise<ResponseData<Chat>> {
    const result = await this.chatService.update(id, chat);
    return getResponseData(result);
  }

  @Delete(':id')
  async deleteChat(
    @Param('id')
    id: string,
  ): Promise<ResponseData<Chat>> {
    const result = await this.chatService.delete(id);
    return getResponseData(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('list')
  async getChats(
    @Body()
    body: SearchChatsDTO,
  ): Promise<ResponseData<any>> {
    const result = await this.chatService.findListFriendMessage(
      body.id,
      body.pageNumber,
      body.pageSize,
    );
    return getResponseData(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('search')
  async getSearchMessageByID(
    @Body()
    body: SearchMessageDTO,
  ): Promise<ResponseData<any>> {
    const result = await this.chatService.findMessageByID(
      body.id,
      body.idSearch,
    );
    return getResponseData(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('message')
  async getMessageByID(
    @Body()
    body: ChatDTO,
  ): Promise<ResponseData<any>> {
    const result = await this.chatService.findMessageByIdChat(
      body.idChat,
      body.idUser,
      body.pageNumber,
      body.pageSize,
    );
    return getResponseData(result);
  }
}
