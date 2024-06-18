export class JoinChatDto {
  id: string;
}

export class MessageDTO {
  from?: string;
  message?: string;
  createAt?: Date;
}

export class UserChatDTO {
  id: string;
  isOwner?: boolean;
  isDisable?: boolean;
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
