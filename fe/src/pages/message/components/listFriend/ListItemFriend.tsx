import { Avatar, Divider, List } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingListFriend from '../loading/LoadingListFriend';
import { getListChat } from '../../../../api/user';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { IStatusCode } from '../../../../interface/IStatusCode';
import { updateNotification } from '../../../../lib/features/notification';

export interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const ListItemFriend: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingFirst, setLoadingFirst] = React.useState<boolean>(true);
  const [selectedEmail, setSelectedEmail] = React.useState<string>('');
  const [data, setData] = React.useState<DataType[]>([]);
  const [total, setTotal] = React.useState<number>(0);

  const { id } = useAppSelector(state => state.user);
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
      setData([...data, ...result.data.listChats])
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
                key={item.email}
                style={{ paddingLeft: '16px', paddingRight: '16px', cursor: 'pointer' }}
                className={`${selectedEmail === item.email && '!bg-primaryGray'} hover:bg-hoverBlue`}
                onClick={() => { setSelectedEmail(item.email) }}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={item.name.last}
                  description={item.email}
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