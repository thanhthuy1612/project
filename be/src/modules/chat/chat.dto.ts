export class JoinChatDto {
  id: string;
}

export class MessageDTO {
  id: string;
  from?: string;
  message?: string;
  createAt?: Date;
}
export class SocketDTO {
  from?: string;
  message?: string;
  idChat?: string;
  pageSizeListMessage?: number;
  pageSizeListFriendMessage?: number;
  pageNumberListMessage?: number;
  pageNumberListFriendMessage?: number;
}

export class UserChatDTO {
  id: string;
  isOwner?: boolean;
  isDisable?: boolean;
  isRead?: string;
}

export class SearchMessageDTO {
  id: string;
  idSearch: string;
}

export class SearchChatsDTO {
  id: string;
  pageNumber: number;
  pageSize: number;
}

export class ChatDTO {
  idChat: string;
  idUser: string;
  pageNumber: number;
  pageSize: number;
}

export class ReturnListMessage {
  id?: string;
  listUser?: string;
  name?: string;
  image?: string;
  createdAt?: Date;
  isReadAll?: boolean;
}
