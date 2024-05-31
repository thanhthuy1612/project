import { Skeleton } from 'antd';
import React from 'react';

const LoadingMessage: React.FC = () => {
  return (
    <>
      {
        Array(3)
          .fill(0)
          .map((_key, index) =>
            <Skeleton
              key={index}
              avatar
              paragraph={{ rows: 0 }}
              active
            />
          )
      }
    </>
  )
}

export default LoadingMessage