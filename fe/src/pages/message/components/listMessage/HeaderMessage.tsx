import { Avatar, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import React from 'react';
import ButtonIcon, { IButtonIconProps } from '../../../../components/button/ButtonIcon';
import {
  PhoneOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { useAppSelector } from '../../../../lib/hooks';
import { urlImg } from '../../../../api/url';

const HeaderMessage: React.FC = () => {
  const { selectedMessage } = useAppSelector(state => state.message)
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
          className=' bg-primaryWhite text-primaryBlueDark mr-[15px] ring-primaryBlueDark ring-offset-2 ring-[1px]'
          icon={<UserOutlined />}
          src={selectedMessage?.image && `${urlImg}${selectedMessage?.image}`}
        />
        <div className=' text-primaryBlueDark text-[20px]'>
          {selectedMessage?.name}
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