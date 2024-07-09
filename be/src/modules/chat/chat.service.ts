import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { Chat } from 'src/models/ChatScheme';
import { User } from 'src/models/UserScheme';
import { ChatsDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { returnListMessage, returnSearch } from 'src/global/utils';
import { MessageDTO, SocketDTO, UserChatDTO } from './chat.dto';
import { v4 as uuidv4 } from 'uuid';

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
      const info = await this.getListMessage(item.id, id, item.isReadAll);
      if (typeof info !== 'string') {
        listMessage = [...listMessage, info];
      }
    }
    return listMessage;
  };

  async findListFriendMessage(
    id: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    try {
      const findUser = await this.userService.findById(id);
      if (!findUser) {
        return 'Error';
      }
      const listChats =
        findUser?.chats.filter((item) => item.isSendMessage) ?? [];
      const listMessage = await this.getListChatsByListId(listChats, id);
      const result = listMessage
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        ?.splice(0, pageNumber * pageSize);
      return {
        listMessage: result,
        totalLength: listChats.length,
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
            {
              ...returnSearch(user),
              isOwner: item?.isOwner,
              isRead: item?.isRead,
            },
          ];
        }
      } catch (error) {
        console.log(error);
      }
    }
    return listUser;
  };

  getListMessage = async (idChat: string, id: string, isReadAll: boolean) => {
    const findChats = await this.chatModel.findById(idChat);
    if (!findChats) {
      return 'Chat not found.';
    }
    const listUser = await this.setListUser(findChats);

    let image = '';
    let name = '';
    if (listUser.length === 2) {
      const user = listUser.find((item) => item.id.toString() !== id);
      image = user?.ava;
      name = user?.username;
    }

    if (listUser.length === 1) {
      image = listUser[0]?.ava;
      name = listUser[0]?.username;
    }
    return returnListMessage({
      ...findChats,
      image: findChats?.image ?? image,
      name: findChats?.name ?? name,
      id: idChat,
      createdAt: findChats?.createdAt,
      isReadAll,
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
        isReadAll: true,
      },
    ];

    const newUserChatsTo: ChatsDTO[] = [
      ...search.chats,
      {
        id: createNewChat._id,
        userID: user._id,
        isSendMessage: false,
        isReadAll: true,
      },
    ];

    await this.userService.update(user._id, {
      chats: newUserChatsFrom,
    });
    await this.userService.update(search._id, {
      chats: newUserChatsTo,
    });
    return this.getListMessage(createNewChat._id, user._id, true);
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
          isReadAll: true,
        },
      ];
      await this.userService.update(findUser._id, {
        chats: newUserChatsFrom,
      });
      return this.getListMessage(createNewChat._id, findUser.id, true);
    }
    return this.getListMessage(
      findChat[0].id,
      findUser.id,
      findChat[0].isReadAll,
    );
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
      return this.getListMessage(findChat[0].id, id, findChat[0]?.isReadAll);
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }
  async findMessageByIdChat(
    idChat: string,
    idUser: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    const findChats = await this.chatModel.findById(idChat);
    const newMessage: MessageDTO[] = findChats.message ?? [];

    const findUser = await this.userService.findById(idUser);
    const chatUser = (findUser.chats ?? []).reduce(
      (result: ChatsDTO[], item) => {
        if (item.id.toString() === idChat) {
          result.push({ ...item, isReadAll: true });
        } else {
          result.push(item);
        }
        return result;
      },
      [],
    );

    await this.userService.update(idUser, { chats: chatUser });

    const spliceMessage = newMessage
      .sort((a, b) => b.createAt.getTime() - a.createAt.getTime())
      .splice(0, pageNumber * pageSize);

    const newListUser = findChats.listUser.reduce(
      (result: UserChatDTO[], item) => {
        if (item.id.toString() === idUser) {
          result.push({ ...item, isRead: spliceMessage[0]?.id ?? '' });
        } else {
          result.push(item);
        }
        return result;
      },
      [],
    );

    await this.chatModel.findByIdAndUpdate(idChat, { listUser: newListUser });

    const listUser = await this.setListUser(findChats);

    return {
      message: spliceMessage,
      total: (findChats.message ?? []).length,
      listUser,
    };
  }

  updateMessageUserStart = async (
    idUser: string,
    idChat: string,
    from: string,
  ) => {
    const findUser = await this.userService.findById(idUser);
    const newChats = findUser.chats.reduce(
      (result: ChatsDTO[], item: ChatsDTO) => {
        if (item.id.toString() === idChat) {
          result.push({
            ...item,
            isSendMessage: true,
            isReadAll: item.userID.toString() !== from,
          });
        } else {
          result.push(item);
        }
        return result;
      },
      [],
    );
    await this.userService.update(idUser, {
      chats: newChats,
    });
  };

  setStartMessage = async (
    listChats: UserChatDTO[],
    idChat: string,
    from: string,
  ) => {
    for (const item of listChats) {
      if (!item.isDisable) {
        await this.updateMessageUserStart(item.id, idChat, from);
      }
    }
  };

  addMessage = async (idChat: string, from: string, message: string) => {
    try {
      const findChats = await this.chatModel.findById(idChat);
      const createAt = new Date();
      await this.setStartMessage(findChats.listUser, idChat, from);
      const newMessage: MessageDTO = {
        id: uuidv4(),
        from,
        message,
        createAt,
      };
      const newListUser = findChats.listUser.reduce(
        (result: UserChatDTO[], item) => {
          if (item.id.toString() === from) {
            result.push({ ...item, isRead: newMessage.id });
          } else {
            result.push(item);
          }
          return result;
        },
        [],
      );
      await this.chatModel.findByIdAndUpdate(idChat, {
        listUser: newListUser,
        message: [...findChats.message, newMessage],
        createAt,
      });
      return {
        listUser: newListUser,
        idChat,
      };
    } catch (error) {
      console.log(error);
    }
  };
  async chatSocket(body: SocketDTO): Promise<any> {
    return await this.addMessage(body.idChat, body.from, body.message);
  }
}
