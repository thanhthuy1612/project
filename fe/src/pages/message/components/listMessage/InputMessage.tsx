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
import ButtonIcon, { IButtonIconProps } from '../../../../components/button/ButtonIcon';

export interface IInputMessageProps {
  send: (input: string) => void
}

const InputMessage: React.FC<IInputMessageProps> = (props) => {
  const [input, setInput] = React.useState<string | undefined>();

  const { send } = props
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

  const onHandleSend = () => {
    input && send(input);
    setInput('')
  }

  const onHandleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value)
  }

  return (
    <Flex className=' h-[50px] items-end justify-between'>
      <Flex>
        {itemsLeft.map((item) => (
          <ButtonIcon key={item.textTooltip} {...item} />
        ))}
      </Flex>
      <Space.Compact className='w-[100%]'>
        <Input value={input} onChange={onHandleChangeInput} onPressEnter={onHandleSend} placeholder='Aa' />
        <Button onClick={onHandleSend} icon={<SendOutlined />}>Send</Button>
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