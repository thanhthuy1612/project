import React from 'react';
import io, { Socket } from "socket.io-client"
import MessageInput from './MessageInput';
import Message from './Message';
import { IMessage } from '../../interface/IMessage';
import { useAppSelector } from '../../lib/hooks';

const Home: React.FC = () => {
  const [socket, setSocket] = React.useState<Socket>();
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const { username } = useAppSelector(state => state.user)

  React.useEffect(() => {
    const newSocket = io("http://localhost:8001")
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (message: IMessage) => {
    setMessages([...messages, message])
  }

  React.useEffect(() => {
    socket?.on("message", messageListener)
    return () => {
      socket?.off("message", messageListener)
    }
  }, [messageListener])

  const send = (value: string) => {
    const message: IMessage = {
      from: username,
      message: value
    }
    socket?.emit("message", message)
  }

  return (
    <div className="mt-[20px]">
      <MessageInput send={send} />
      <Message messages={messages} />
    </div>
  );
}

export default Home