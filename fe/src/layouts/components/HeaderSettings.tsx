import React from 'react';

export interface IHeaderSettings {
  title: string,
}

const HeaderSettings: React.FC<IHeaderSettings> = ({ title }) => {
  return <div className='text-[25px] mb-[20px]'>{title}</div>
}

export default HeaderSettings