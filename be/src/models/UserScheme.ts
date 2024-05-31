import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FriendsDTO } from 'src/modules/user/user.dto';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Date })
  timeJoin: Date;

  @Prop()
  refreshToken: string;

  @Prop()
  ava: string;

  @Prop()
  banner: string;

  @Prop()
  phone: string;

  @Prop()
  prefix: string;

  @Prop()
  gender: string;

  @Prop()
  bio: string;

  @Prop()
  friends: FriendsDTO[];

  @Prop()
  chats: string[];

  @Prop()
  twoFactorAuthenticationSecret: string;

  @Prop()
  isTwoFactorAuthenticationEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
