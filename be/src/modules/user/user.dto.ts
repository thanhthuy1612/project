export class ChangePasswordDto {
  email: string;
  oldPassword?: string;
  newPassword: string;
}

export class ChangeEmailDto {
  email: string;
  password: string;
  username: string;
}

export class FriendsDTO {
  userID: string;
  messageID: string;
  createAt: Date;
}

export class ChatsDTO {
  id: string;
  userID: string;
  isSendMessage: boolean;
}

export class SearchChatsDTO {
  id: string;
  pageNumber: number;
  pageSize: number;
}
