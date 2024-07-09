import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { ChatDTO, SocketDTO } from './chat.dto';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() body: SocketDTO) {
    const res = await this.chatService.chatSocket(body);
    this.server.emit('message', res);
  }

  @SubscribeMessage('fetchMessages')
  async fetchMessages(@MessageBody() body: ChatDTO) {
    const res = await this.chatService.findMessageByIdChat(
      body.idChat,
      body.idUser,
      body.pageNumber,
      body.pageSize,
    );
    this.server.emit('fetchMessages', res);
  }
}
