import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageDTO, UserChatDTO } from 'src/modules/chat/chat.dto';

@Schema({
  timestamps: true,
})
export class Chat extends Document {
  @Prop()
  listUser: UserChatDTO[];

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  message: MessageDTO[];

  @Prop()
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
