import React from 'react';

export interface IMessageProps {
  messages: string[]
}
const Message: React.FC<IMessageProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message: string, index: number) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  )
}

export default Message