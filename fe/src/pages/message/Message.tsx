import React from 'react';
import InputMessage from './components/listMessage/InputMessage';
import ListItemMessage from './components/listMessage/ListItemMessage';
import HeaderMessage from './components/listMessage/HeaderMessage';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { Empty } from 'antd';
import io, { Socket } from 'socket.io-client';
import { ISocket } from '../../interface/IMessage';
import { updatePageNumberListFriendMessage, updatePageNumberListMessage, updateSelectedMessage } from '../../lib/features/message';
import { defaultPageSize } from '../../utils/utils';
import { useMessage } from '../../utils/useMessage';
import { IUserFriend } from '../../interface/IDataListFriend';

const Message: React.FC = () => {
  const [socket, setSocket] = React.useState<Socket>();

  const dispatch = useAppDispatch();

  const { loadMoreDataListFriendMessage, loadMoreDataListMessage } = useMessage()

  const { id } = useAppSelector(state => state.user);
  const { selectedMessage, pageNumberListFriendMessage, pageNumberListMessage } = useAppSelector(state => state.message);

  React.useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket])

  const messageListener = (result: any) => {
    const checkUser = (result?.listUser ?? []).filter((item: IUserFriend) => item.id === id)
    if (checkUser.length) {
      dispatch(updatePageNumberListFriendMessage(1))
      loadMoreDataListFriendMessage(true);
    }
    if (result.idChat === selectedMessage?.id) {
      dispatch(updatePageNumberListMessage(1));
      loadMoreDataListMessage(true);
    }
  }

  React.useEffect(() => {
    socket?.on("message", messageListener)
    return () => {
      socket?.off("message", messageListener)
    }
  }, [messageListener]);

  React.useEffect(() => {
    dispatch(updateSelectedMessage(undefined));
  }, [])

  const send = (input: string) => {
    const message: ISocket = {
      idChat: selectedMessage?.id,
      from: id,
      message: input,
      pageSizeListMessage: defaultPageSize,
      pageSizeListFriendMessage: defaultPageSize,
      pageNumberListMessage,
      pageNumberListFriendMessage,
    }
    socket?.emit("message", message)
  }

  const renderMessage = () => (
    <div className=' h-[100%]'>
      <HeaderMessage />
      <ListItemMessage />
      <InputMessage send={send} />
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