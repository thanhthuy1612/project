import { Avatar, Divider, List } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingListFriend from '../loading/LoadingListFriend';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { IStatusCode } from '../../../../interface/IStatusCode';
import { updateNotification } from '../../../../lib/features/notification';
import { getListChat } from '../../../../api/chat';
import { UserOutlined } from '@ant-design/icons'
import { IDataListFriend } from '../../../../interface/IDataListFriend';
import { updateSelectedMessage } from '../../../../lib/features/message';
import { dateFormat } from '../../../../ultis/time';
import { DateFormatType } from '../../../../interface/IRouter';
import { urlImg } from '../../../../api/url';

const ListItemFriend: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingFirst, setLoadingFirst] = React.useState<boolean>(true);
  const [data, setData] = React.useState<IDataListFriend[]>([]);
  const [total, setTotal] = React.useState<number>(0);

  const { id } = useAppSelector(state => state.user);
  const { selectedMessage } = useAppSelector(state => state.message);

  const dispatch = useAppDispatch()

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const result = await getListChat({
      id: id ?? '',
      pageNumber: 20,
      pageSize: 1
    })
    if (result.statusCode === IStatusCode.SUCCESS) {
      setData([...data, ...result.data.listMessage])
      setTotal(result.data.totalLength)
    } else {
      dispatch(updateNotification({
        type: 'fail',
        description: result.data
      }))
    }
    setLoading(false);
    setLoadingFirst(false);
  };

  React.useEffect(() => {
    id && loadMoreData();
  }, [id]);

  const onHandleSelectedMessage = (item: IDataListFriend) => {
    dispatch(updateSelectedMessage(item))
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
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < total}
        loader={<LoadingListFriend />}
        endMessage={data.length ? <Divider plain>It is all, nothing more 🤐</Divider> : undefined}
        scrollableTarget="scrollableDiv"
      >
        {!loadingFirst &&
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                style={{ paddingLeft: '16px', paddingRight: '16px', cursor: 'pointer' }}
                className={`${selectedMessage?.id === item.id && '!bg-primaryGray'} hover:bg-hoverBlue`}
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