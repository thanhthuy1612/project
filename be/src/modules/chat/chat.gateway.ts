import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDTO } from './chat.dto';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: MessageDTO): void {
    console.log(message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('fetchMessages')
  async fetchMessages(id: string) {
    const messages = await this.chatService.findById(id);
    this.server.emit('messages', messages);
  }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   console.log(client, payload);
  //   return 'Hello world!';
  // }
}
