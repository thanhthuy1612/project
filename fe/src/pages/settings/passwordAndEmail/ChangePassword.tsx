import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';

type FieldType = {
  oldPassword?: string;
  newPassword?: string;
  rePassword?: string;
};

const ChangePassword: React.FC = () => {
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
      name="oldPassword"
      label="Old Password:"
      rules={[{ required: true, message: 'Please input your old password!' }]}
    >
      <Input.Password disabled={isDisable} placeholder="Input your old password" />
    </Form.Item>

    <Form.Item<FieldType>
      name="newPassword"
      label="New Password:"
      rules={[{ required: true, message: 'Please input your new password!' }]}
    >
      <Input.Password disabled={isDisable} placeholder="Input your new password" />
    </Form.Item>

    <Form.Item<FieldType>
      name="rePassword"
      label="Confirm Password:"
      rules={[
        {
          required: true, message: 'Please input your re-password!'
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password disabled={isDisable} placeholder="Input your new password" />
    </Form.Item>

    <Form.Item >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
}

export default ChangePassword