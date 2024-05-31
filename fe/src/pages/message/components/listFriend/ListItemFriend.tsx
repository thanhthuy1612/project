import { Avatar, Divider, List } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingListFriend from '../loading/LoadingListFriend';

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

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
        !selectedEmail && setSelectedEmail(body.results[0].email)
        setLoadingFirst(false);
      })
      .catch(() => {
        setLoading(false);
        setLoadingFirst(false);
      });
  };

  React.useEffect(() => {
    loadMoreData();
  }, []);

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
        hasMore={data.length < 50}
        loader={<LoadingListFriend />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
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