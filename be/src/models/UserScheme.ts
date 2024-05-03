import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  twoFactorAuthenticationSecret: string;

  @Prop()
  isTwoFactorAuthenticationEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
