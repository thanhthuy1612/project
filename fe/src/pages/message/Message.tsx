import React from 'react';
import InputMessage from './components/listMessage/InputMessage';
import ListItemMessage from './components/listMessage/ListItemMessage';
import HeaderMessage from './components/listMessage/HeaderMessage';
import { useAppSelector } from '../../lib/hooks';
import { Empty } from 'antd';

const Message: React.FC = () => {
  const { selectedMessage } = useAppSelector(state => state.message);
  const renderMessage = () => (
    <div className=' h-[100%]'>
      <HeaderMessage />
      <ListItemMessage />
      <InputMessage />
    </div>
  );
  const renderNoData = () => (
    <div className=' h-[100%] flex items-center justify-center'>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  )
  return (
    <>{selectedMessage ? renderMessage() : renderNoData()}</>
  )
}

export default Message