import { Button, Flex, Input, Space } from 'antd';
import {
  SendOutlined,
  AudioOutlined,
  PictureOutlined,
  ShopOutlined,
  SmileOutlined,
  LikeOutlined
} from '@ant-design/icons';
import React from 'react';
import ButtonIcon, { IButtonIconProps } from '../button/ButtonIcon';

const InputMessage: React.FC = () => {
  const itemsLeft: IButtonIconProps[] = [
    {
      textTooltip: 'Send a voice clip',
      Icon: AudioOutlined
    },
    {
      textTooltip: 'Attach a file',
      Icon: PictureOutlined
    },
    {
      textTooltip: 'Choose a Sticker',
      Icon: ShopOutlined
    },
    {
      textTooltip: 'Choose a Icon',
      Icon: SmileOutlined
    }
  ]

  const itemsRight: IButtonIconProps[] = [
    {
      textTooltip: 'Like',
      Icon: LikeOutlined,
      positionRight: true
    }
  ]

  return (
    <Flex className=' h-[50px] items-end justify-between'>
      <Flex>
        {itemsLeft.map((item) => (
          <ButtonIcon key={item.textTooltip} {...item} />
        ))}
      </Flex>
      <Space.Compact className='w-[100%]'>
        <Input placeholder='Aa' />
        <Button icon={<SendOutlined />}>Send</Button>
      </Space.Compact>
      <Flex>
        {itemsRight.map((item) => (
          <ButtonIcon key={item.textTooltip} {...item} />
        ))}
      </Flex>
    </Flex>
  )
}

export default InputMessage