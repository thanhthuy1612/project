import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';

type FieldType = {
  email?: string
};

const ChangeEmail: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false)
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsDisable(true)
    console.log(values)
    setIsDisable(false)
  };
  return <Form
    name="register"
    style={{ width: 500 }}
    onFinish={onFinish}
    layout='vertical'
    autoComplete="off"
  >
    <Form.Item<FieldType>
      name="email"
      label="Email:"
      rules={[{ required: true, message: 'Please input your old password!' }]}
    >
      <Input disabled={isDisable} placeholder="Input your email" />
    </Form.Item>

    <Form.Item >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
}

export default ChangeEmail