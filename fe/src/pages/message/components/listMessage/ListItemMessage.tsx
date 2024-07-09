import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';
import LoadingMessage from '../loading/LoadingMessage';
import ItemMessage from './itemMessage/ItemMessage';
import MyMessage from './itemMessage/MyMessage';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { updateIsLoadingListMessage, updatePageNumberListMessage } from '../../../../lib/features/message';
import { useMessage } from '../../../../utils/useMessage';
import { urlImg } from '../../../../api/url';
import ListAva from './itemMessage/ListAva';
import { dateFormat, getTick } from '../../../../utils/useTime';
const ListItemMessage: React.FC = () => {

  const dispatch = useAppDispatch();
  const { selectedMessage, listMessage, totalListMessage, listUserInMessageSelected } = useAppSelector(state => state.message);
  const { id } = useAppSelector(state => state.user);

  const { loadMoreDataListMessage } = useMessage();


  React.useEffect(() => {
    dispatch(updateIsLoadingListMessage(false));
    dispatch(updatePageNumberListMessage(1));
    loadMoreDataListMessage(true);
  }, [selectedMessage?.id]);

  const getUrlAva = (from: string | undefined) => {
    const url = (listUserInMessageSelected ?? []).find(item => item.id === from)?.ava;
    return url && from ? `${urlImg}${url}` : undefined;
  }

  const checkShowAva = (index: number): boolean => {
    const oldDate = getTick(listMessage[index + 1]?.createAt);
    const newDate = getTick(listMessage[index]?.createAt);
    if (index === listMessage.length - 1) {
      return listMessage[index - 1].from === listMessage[index].from;
    }

    if (!newDate || !oldDate) {
      return false;
    }


    if (listMessage[index + 1].from !== listMessage[index].from) {
      return true;
    }

    return Boolean(oldDate && newDate && newDate - oldDate > 60 * 60 * 1000);
  };

  const checkShowDate = (index: number) => {
    const oldDate = getTick(listMessage[index + 1]?.createAt);
    const newDate = getTick(listMessage[index]?.createAt);

    if (!newDate || !oldDate) {
      return false;
    }
    return Boolean(oldDate && newDate && newDate - oldDate > 60 * 60 * 1000 * 12);
  }

  return (
    <div
      id="scrollableMessage"
      style={{
        height: 'calc(100% - 100px)',
        overflow: 'auto',
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      <InfiniteScroll
        dataLength={totalListMessage}
        next={loadMoreDataListMessage}
        hasMore={listMessage.length < totalListMessage}
        loader={<LoadingMessage />}
        endMessage={<Divider plain>{listMessage.length ? 'It is all, nothing more 🤐' : 'No messages'}</Divider>}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse={true}
        scrollableTarget="scrollableMessage"
      >
        {listMessage.map((item, index) => (
          <div key={item.id}>
            {checkShowDate(index) && <Divider style={{ fontSize: '12px' }}>{dateFormat(item.createAt)}</Divider>}
            {item.from === id ?
              <MyMessage
                message={item.message}
                date={item.createAt}
                isShowAva={checkShowAva(index)}
              />
              :
              <ItemMessage
                message={item.message}
                date={item.createAt}
                src={getUrlAva(item?.from)}
                isShowAva={checkShowAva(index)}
              />
            }
            <ListAva idChat={item.id} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default ListItemMessage