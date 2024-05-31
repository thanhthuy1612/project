import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'src/models/ChatScheme';
import { UserService } from '../user/user.service';
import { UserSchema } from 'src/models/UserScheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, UserService, ChatGateway],
})
export class ChatModule {}
