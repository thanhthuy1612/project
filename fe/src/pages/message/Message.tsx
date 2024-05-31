import React from 'react';
import InputMessage from './components/listMessage/InputMessage';
import ListItemMessage from './components/listMessage/ListItemMessage';
import HeaderMessage from './components/listMessage/HeaderMessage';

const Message: React.FC = () => {
  return (
    <div className=' h-[100%]'>
      <HeaderMessage />
      <ListItemMessage />
      <InputMessage />
    </div>
  )
}

export default Message