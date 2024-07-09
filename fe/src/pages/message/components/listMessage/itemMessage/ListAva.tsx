import React from 'react';
import { useAppSelector } from '../../../../../lib/hooks';
import { Avatar, Flex, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { urlImg } from '../../../../../api/url';

export interface IListAvaProps {
  idChat?: string;
}

const ListAva: React.FC<IListAvaProps> = ({ idChat }) => {
  const { listUserInMessageSelected } = useAppSelector(item => item.message);
  const { id } = useAppSelector(item => item.user);

  const listUserReadMessage = (listUserInMessageSelected ?? []).filter((item) => item.isRead === idChat && item.id !== id);

  return <Flex className=' justify-end'>
    <Avatar.Group>
      {listUserReadMessage?.map(item => (
        <Tooltip key={item.id} title={item.username} placement="top">
          <Avatar
            size={15}
            className='border-primaryBlueDark bg-primaryWhite text-primaryBlueDark mb-[5px]'
            src={item.ava && `${urlImg}${item.ava}`}
            icon={<UserOutlined />}
          />
        </Tooltip>
      ))}
    </Avatar.Group>
  </Flex>
}

export default ListAva;