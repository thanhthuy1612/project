import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { Chat } from 'src/models/ChatScheme';
import { User } from 'src/models/UserScheme';
import { ChatsDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { returnListMessage, returnSearch } from 'src/global/utils';

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

  getListChatsByListId = async (listChats: ChatsDTO[], id: string) => {
    let listMessage = [];
    for (const item of listChats) {
      const info = await this.getListMessage(item.id, id);
      if (info) {
        listMessage = [...listMessage, info];
      }
    }
    return listMessage;
  };

  async findMessage(
    id: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    try {
      const findUser = await this.userService.findById(id);
      if (!findUser) {
        return 'Error';
      }
      const listChats = findUser?.chats ?? [];
      const listMessage = await this.getListChatsByListId(listChats, id);
      const result = listMessage
        .sort((a, b) => b.createdAt - a.createdAt)
        ?.splice(pageNumber * (pageSize - 1), pageNumber * pageSize);
      return {
        listMessage: result,
        totalLength: (findUser?.chats ?? []).length,
      };
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }

  setListUser = async (findChats: Chat) => {
    let listUser = [];
    for (const item of findChats.listUser) {
      try {
        const user = await this.userService.findById(item.id);
        if (user) {
          listUser = [
            ...listUser,
            { ...returnSearch(user), isOwner: item?.isOwner },
          ];
        }
      } catch (error) {
        console.log(error);
      }
    }
    return listUser;
  };

  getListMessage = async (idChat: string, id: string) => {
    const findChats = await this.chatModel.findById(idChat);
    if (!findChats) {
      return 'Chat not found.';
    }
    const listUser = await this.setListUser(findChats);

    let image = '';
    let name = '';
    if (listUser.length === 2) {
      const user = listUser.filter((item) => item.id.toString() !== id)?.[0];
      image = user?.ava;
      name = user?.username;
    }

    if (listUser.length === 1) {
      image = listUser[0]?.ava;
      name = listUser[0]?.username;
    }
    return returnListMessage({
      ...findChats,
      listUser,
      image: findChats?.image ?? image,
      name: findChats?.name ?? name,
      id: idChat,
      createdAt: findChats?.createdAt,
    });
  };

  createMessage = async (user: User, search: User) => {
    const createNewChat = await this.chatModel.create({
      listUser: [
        {
          id: user._id,
          isOwner: true,
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
    return this.getListMessage(createNewChat._id, user._id);
  };

  createChatYourSell = async (findUser: User) => {
    const findChat = findUser.chats.filter(
      (item) => findUser._id.toString() === item.userID.toString(),
    );

    if (!findChat.length) {
      const createNewChat = await this.chatModel.create({
        listUser: [{ id: findUser._id }],
        createdAt: new Date(),
      });
      const newUserChatsFrom: ChatsDTO[] = [
        ...findUser.chats,
        {
          id: createNewChat._id,
          userID: findUser._id,
          isSendMessage: false,
        },
      ];
      await this.userService.update(findUser._id, {
        chats: newUserChatsFrom,
      });
      return this.getListMessage(createNewChat._id, findUser.id);
    }
    return this.getListMessage(findChat[0].id, findUser.id);
  };

  async findMessageByID(id: string, idSearch: string): Promise<any> {
    try {
      const findUser = await this.userService.findById(id);
      if (!findUser) {
        return 'Your username not found.';
      }
      if (id === idSearch) {
        return this.createChatYourSell(findUser);
      }
      const findUserSearch = await this.userService.findById(idSearch);
      if (!findUserSearch) {
        return 'Username search not found.';
      }

      const findChat = findUser.chats.filter(
        (item) => findUserSearch._id.toString() === item.userID.toString(),
      );

      if (!findChat.length) {
        return await this.createMessage(findUser, findUserSearch);
      }
      return this.getListMessage(findChat[0].id, id);
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }
  async findMessageByIdChat(
    idChat: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    const findChats = await this.chatModel.findById(idChat);
    const newMessage = findChats.message ?? [];

    const spliceMessage = newMessage.splice(
      pageNumber * (pageSize - 1),
      pageNumber * pageSize,
    );

    return {
      message: spliceMessage,
      total: (findChats.message ?? []).length,
    };
  }
}
