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
import io, { Socket } from 'socket.io-client';
import { IMessage } from '../../../../interface/IMessage';
import { useAppSelector } from '../../../../lib/hooks';

const InputMessage: React.FC = () => {
  const [input, setInput] = React.useState<string | undefined>();
  const [socket, setSocket] = React.useState<Socket>();
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const { username } = useAppSelector(state => state.user)

  React.useEffect(() => {
    const newSocket = io("http://localhost:8001")
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (message: IMessage) => {
    setMessages([...messages, message])
  }

  React.useEffect(() => {
    socket?.on("message", messageListener)
    return () => {
      socket?.off("message", messageListener)
    }
  }, [messageListener])

  const send = (value: string) => {
    const message: IMessage = {
      from: username,
      message: value
    }
    socket?.emit("message", message)
  }

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
    input && send(input)
  }

  const onHandleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e)
  }

  return (
    <Flex className=' h-[50px] items-end justify-between'>
      <Flex>
        {itemsLeft.map((item) => (
          <ButtonIcon key={item.textTooltip} {...item} />
        ))}
      </Flex>
      <Space.Compact className='w-[100%]'>
        <Input value={input} onChange={onHandleChangeInput} placeholder='Aa' />
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