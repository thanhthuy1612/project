import { Flex, Tooltip } from 'antd';
import React from 'react';
import { dateFormat } from '../../../../../utils/useTime';

export interface IItemMessageProps {
  message?: string;
  date?: Date;
  isShowAva?: boolean;
}

const MyMessage: React.FC<IItemMessageProps> = (props) => {
  const { message, date, isShowAva } = props;
  return (
    <Flex className={`w-[100%] my-[2px] ${isShowAva && 'mt-[10px]'} flex-col items-end`}>
      <Tooltip title={dateFormat(date)} placement="top">
        <div
          className=' bg-primaryBlueDark max-w-[100%] break-words rounded-[15px] text-primaryWhite w-[fit-content] border-[1px] border-primaryBlueDark p-[10px]'
        >
          {message}
        </div>
      </Tooltip>
    </Flex>
  )
}

export default MyMessage