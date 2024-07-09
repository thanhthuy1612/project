import { Avatar, Divider, List } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingListFriend from '../loading/LoadingListFriend';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { UserOutlined } from '@ant-design/icons'
import { IDataListFriend } from '../../../../interface/IDataListFriend';
import { updatePageNumberListFriendMessage, updateSelectedMessage } from '../../../../lib/features/message';
import { dateFormat } from '../../../../utils/useTime';
import { DateFormatType } from '../../../../interface/IRouter';
import { urlImg } from '../../../../api/url';
import { useMessage } from '../../../../utils/useMessage';

const ListItemFriend: React.FC = () => {
  const [loadingFirst, setLoadingFirst] = React.useState<boolean>(true);

  const { id } = useAppSelector(state => state.user);
  const { selectedMessage, listFriendMessage, totalListFriendMessage } = useAppSelector(state => state.message);

  const dispatch = useAppDispatch()
  const { loadMoreDataListFriendMessage } = useMessage()

  React.useEffect(() => {
    if (id) {
      dispatch(updatePageNumberListFriendMessage(1))
      loadMoreDataListFriendMessage(true);
      setLoadingFirst(false);
    }
  }, [id]);

  const onHandleSelectedMessage = (item: IDataListFriend) => {
    dispatch(updateSelectedMessage(item))
  }

  const getColorBg = (item: IDataListFriend) => {
    if (selectedMessage?.id === item.id) {
      return '!bg-hoverPrimary'
    }
    if (!item.isReadAll) {
      return 'bg-yellowLight'
    }
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 'calc(100% - 50px)',
        overflow: 'auto',
      }}
    >
      <InfiniteScroll
        dataLength={listFriendMessage.length}
        next={loadMoreDataListFriendMessage}
        hasMore={listFriendMessage.length < totalListFriendMessage}
        loader={<LoadingListFriend />}
        endMessage={listFriendMessage.length ? <Divider plain>It is all, nothing more 🤐</Divider> : undefined}
        scrollableTarget="scrollableDiv"
      >
        {!loadingFirst &&
          <List
            dataSource={listFriendMessage}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                style={{ paddingLeft: '16px', paddingRight: '16px', cursor: 'pointer' }}
                className={`hover:bg-hoverBlue ${getColorBg(item)}`}
                onClick={() => { onHandleSelectedMessage(item) }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className=' bg-primaryWhite text-primaryBlueDark ring-primaryBlueDark ring-offset-2 ring-[1px]'
                      src={item?.image && `${urlImg}${item?.image}`}
                      icon={<UserOutlined />}
                    />
                  }
                  title={item?.name}
                  description={item?.createdAt && dateFormat(item?.createdAt, DateFormatType.FullDate)}
                />
              </List.Item>
            )}
          />
        }
      </InfiniteScroll>
    </div>
  )
}

export default ListItemFriend