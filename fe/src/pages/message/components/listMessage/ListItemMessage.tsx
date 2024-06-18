import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';
import LoadingMessage from '../loading/LoadingMessage';
import ItemMessage from './itemMessage/ItemMessage';
import MyMessage from './itemMessage/MyMessage';
import { IMessage } from '../../../../interface/IDataListFriend';
import { useAppSelector } from '../../../../lib/hooks';
import { getMessage } from '../../../../api/chat';

const ListItemMessage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IMessage[]>([]);

  console.log(data);

  const { selectedMessage } = useAppSelector(state => state.message)

  const scrollMessageData = (oldData: IMessage[], newData: IMessage[]) => {
    let indexStart = 0;
    const resultOldData = oldData.reduce((result: IMessage[], item) => {
      indexStart++;
      return [...result, { ...item, ref: false, email: indexStart.toString() }]
    }, [])
    const resultNewData = newData.reduce((result: IMessage[], item, index) => {
      indexStart++;
      if (!index) {
        return [...result, { ...item, ref: true, email: indexStart.toString() }]
      }
      return [...result, { ...item, ref: false, email: indexStart.toString() }]
    }, [])
    return [...resultOldData, ...resultNewData]
  }

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (selectedMessage?.id) {
      const result = await getMessage({ id: selectedMessage?.id, pageNumber: 1, pageSize: 20 });
      setLoading(false);
    }
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
          <div key={index}>
            {index % 2 === 0 ?
              <ItemMessage
                message={item.message ?? ''}
                date={new Date}
                src={undefined}
              />
              :
              <MyMessage
                message={item.message ?? ''}
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