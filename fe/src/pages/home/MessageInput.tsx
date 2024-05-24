import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';

type FieldType = {
  message?: string;
};

export interface IMessageInputProps {
  send: (message: string) => void
}

const MessageInput: React.FC<IMessageInputProps> = ({ send }) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    values?.message && send(values.message)
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout='horizontal'
    >
      <Form.Item<FieldType>
        label="Message"
        name="message"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default MessageInput