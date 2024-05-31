import React from 'react';
import { IMessage } from '../../interface/IMessage';

export interface IMessageProps {
  messages: IMessage[]
}
const Message: React.FC<IMessageProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message: IMessage, index: number) => (
        <div key={index}>{message.message}</div>
      ))}
    </div>
  )
}

export default Message