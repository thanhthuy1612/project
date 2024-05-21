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
