import { Avatar, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import React from 'react';
import ButtonIcon, { IButtonIconProps } from '../button/ButtonIcon';
import {
  PhoneOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';

const HeaderMessage: React.FC = () => {
  const items: IButtonIconProps[] = [
    {
      textTooltip: 'Start a voice call',
      Icon: PhoneOutlined,
      positionRight: true,
      textButton: 'Voice Call'
    },
    {
      textTooltip: 'Start a video call',
      Icon: VideoCameraOutlined,
      positionRight: true,
      textButton: 'Video Call'
    }
  ]
  return (
    <Flex className=' h-[50px] items-center justify-between'>
      <Flex className=' items-center'>
        <Avatar
          className=' bg-primaryWhite text-primaryBlueDark mr-[20px] ring-primaryBlueDark ring-offset-2 ring-[1px]'
          icon={<UserOutlined />}
          src={undefined}
        />
        <div className=' text-primaryBlueDark text-[20px] font-[600]'>
          123
        </div>
      </Flex>
      <Flex>
        {items.map((item) => (
          <ButtonIcon key={item.textTooltip} {...item} />
        ))}
      </Flex>
    </Flex>
  )
}

export default HeaderMessage