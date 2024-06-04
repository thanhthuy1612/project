import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { Chat } from 'src/models/ChatScheme';
import { User } from 'src/models/UserScheme';
import { UserService } from '../user/user.service';
import { ChatsDTO } from '../user/user.dto';

@Injectable()
export class ChatService extends BaseService<Chat> {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: mongoose.Model<Chat>,
    private readonly userService: UserService,
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

  createMessage = async (user: User, search: User) => {
    const createNewChat = await this.chatModel.create({
      listUser: [
        {
          id: user._id,
        },
        {
          id: search._id,
        },
      ],
      createdAt: new Date(),
    });
    const newUserChatsFrom: ChatsDTO[] = [
      ...user.chats,
      {
        id: createNewChat._id,
        userID: search._id,
        isSendMessage: false,
      },
    ];

    const newUserChatsTo: ChatsDTO[] = [
      ...search.chats,
      {
        id: createNewChat._id,
        userID: user._id,
        isSendMessage: false,
      },
    ];

    await this.userService.update(user._id, {
      chats: newUserChatsFrom,
    });
    await this.userService.update(search._id, {
      chats: newUserChatsTo,
    });
    return {
      id: createNewChat._id,
      name: search._id,
      isSendMessage: false,
    };
  };

  async findMessageByUsername(id: string, idSearch: string): Promise<any> {
    try {
      const findUserSearch = await this.userService.findById(idSearch);
      if (!findUserSearch) {
        return 'Username search not found.';
      }
      const findUser = await this.userService.findById(id);
      if (!findUser) {
        return 'Your username not found.';
      }

      const findChat = findUser.chats.filter(
        (item) => findUserSearch._id === item.id,
      );

      if (!findChat.length) {
        return await this.createMessage(findUser, findUserSearch);
      }
      return findChat;
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }
}
