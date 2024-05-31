import { Avatar, Flex } from 'antd';
import React from 'react';
import { dateFormat } from '../../../../../ultis/time';

export interface IItemMessageProps {
  message: string;
  date: Date;
  src?: string;
}

const ItemMessage: React.FC<IItemMessageProps> = (props) => {
  const { message, date, src } = props;
  return (
    <Flex className='w-[100%] my-[5px]'>
      <Avatar src={src} />
      <Flex className=' flex-col w-[60%] ml-[20px]'>
        <div
          className=' border-primaryBlueDark max-w-[100%] break-words rounded-[15px] text-primaryBlueDark w-[fit-content] border-[1px] p-[10px]'
        >
          {message}
        </div>
        <div className='text-[10px] mt-[5px] text-primaryBlueMedium'>{dateFormat(date)}</div>
      </Flex>
    </Flex>
  )
}

export default ItemMessage