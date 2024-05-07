import { Spin, SpinProps } from 'antd';
import React from 'react';

const LoadingSpin: React.FC<SpinProps> = (props) => {
  return <Spin className='flex justify-center items-center' {...props} />
}

export default LoadingSpin