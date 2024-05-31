import { Skeleton } from 'antd';
import React from 'react';

const LoadingListFriend: React.FC = () => {
  return (
    <>
      {
        Array(3)
          .fill(0)
          .map((_key, index) =>
            <Skeleton
              style={{ paddingLeft: '16px', paddingRight: '16px', paddingTop: '5px' }}
              key={index}
              avatar
              paragraph={{ rows: 1 }}
              active
            />
          )
      }
    </>
  )
}

export default LoadingListFriend