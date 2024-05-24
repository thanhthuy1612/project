import React from 'react';
import io, { Socket } from "socket.io-client"
import MessageInput from './MessageInput';
import Message from './Message';

const Home: React.FC = () => {
  const [socket, setSocket] = React.useState<Socket>()
  const [messages, setMessages] = React.useState<string[]>([])

  React.useEffect(() => {
    const newSocket = io("http://localhost:8001")
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (message: string) => {
    setMessages([...messages, message])
  }

  React.useEffect(() => {
    socket?.on("message", messageListener)
    return () => {
      socket?.off("message", messageListener)
    }
  }, [messageListener])

  const send = (value: string) => {
    socket?.emit("message", value)
  }

  return (
    <div className="mt-[20px]">
      <MessageInput send={send} />
      <Message messages={messages} />
    </div>
  );
}

export default Home