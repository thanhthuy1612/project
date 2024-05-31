import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';
import LoadingMessage from '../loading/LoadingMessage';
import ItemMessage from './itemMessage/ItemMessage';
import MyMessage from './itemMessage/MyMessage';

interface DataType {
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
  ref?: boolean;
}

const ListItemMessage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<DataType[]>([]);

  console.log(data);

  const scrollMessageData = (oldData: DataType[], newData: DataType[]) => {
    let indexStart = 0;
    const resultOldData = oldData.reduce((result: DataType[], item) => {
      indexStart++;
      return [...result, { ...item, ref: false, email: indexStart.toString() }]
    }, [])
    const resultNewData = newData.reduce((result: DataType[], item, index) => {
      indexStart++;
      if (!index) {
        return [...result, { ...item, ref: true, email: indexStart.toString() }]
      }
      return [...result, { ...item, ref: false, email: indexStart.toString() }]
    }, [])
    return [...resultOldData, ...resultNewData]
  }

  const loadMoreData = () => {
    console.log(1)
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData(scrollMessageData(data, body.results));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    loadMoreData();
  }, []);

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
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<LoadingMessage />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse={true}
        scrollableTarget="scrollableMessage"
      >
        {data.map((item, index) => (
          <div key={item.email}>
            {index % 2 === 0 ?
              <ItemMessage
                message={item.email}
                date={new Date}
                src={item.picture.large}
              />
              :
              <MyMessage
                message={item.email}
                date={new Date}
              />
            }
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default ListItemMessage