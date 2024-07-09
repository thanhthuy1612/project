import { Avatar, Flex, Tooltip } from 'antd';
import React from 'react';
import { dateFormat } from '../../../../../utils/useTime';
import { UserOutlined } from '@ant-design/icons';

export interface IItemMessageProps {
  message?: string;
  date?: Date;
  src?: string;
  isShowAva?: boolean;
}

const ItemMessage: React.FC<IItemMessageProps> = (props) => {
  const { message, date, src, isShowAva } = props;
  return (
    <Flex className={`w-[100%] my-[2px] ${isShowAva && 'mt-[10px]'}`}>
      <div className='w-[50px]'>
        {isShowAva &&
          <Avatar
            className='border-primaryBlueDark bg-primaryWhite text-primaryBlueDark'
            src={src}
            icon={<UserOutlined />}
          />
        }
      </div>
      <Flex className=' flex-col w-[60%]'>
        <Tooltip title={dateFormat(date)} placement="top">
          <div
            className=' border-primaryBlueDark max-w-[100%] break-words rounded-[15px] text-primaryBlueDark w-[fit-content] border-[1px] p-[10px]'
          >
            {message}
          </div>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default ItemMessage