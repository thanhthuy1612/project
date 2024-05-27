export class JoinChatDto {
  id: string;
}

export class MessageDTO {
  from?: string;
  message?: string;
  createAt?: Date;
}

export class UserChatDTO {
  username: string;
  ava: string;
}
