import { Flex } from 'antd';
import React from 'react';
import { dateFormat } from '../../../../../ultis/time';

export interface IItemMessageProps {
  message: string;
  date: Date;
}

const MyMessage: React.FC<IItemMessageProps> = (props) => {
  const { message, date } = props;
  return (
    <Flex className='w-[100%] my-[5px] flex-col items-end'>
      <div
        className=' bg-primaryBlueDark max-w-[100%] break-words rounded-[15px] text-primaryWhite w-[fit-content] border-[1px] border-primaryBlueDark p-[10px]'
      >
        {message}
      </div>
      <div className='text-[10px] mt-[5px] text-primaryBlueMedium'>{dateFormat(date)}</div>
    </Flex>
  )
}

export default MyMessage