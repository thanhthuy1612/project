import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { changeEmail } from '../../../api/user';
import { resetStateUser, updateUser } from '../../../lib/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useNotification } from '../../../utils/useNotification';

type FieldType = {
  email?: string,
  password?: string
};

const ChangeEmail: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { email, havePassword, username } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const { setNotification } = useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsDisable(true)
    if (values?.email && values?.password && username) {
      const res = await changeEmail(
        {
          email: values?.email,
          password: values?.password,
          username
        }
      );
      const onSuccess = () => {
        dispatch(updateUser(res.data));
        googleLogout();
        dispatch(resetStateUser());
        localStorage.clear();
        navigate('/login');
      }
      setNotification(res, 'Change email successfully', onSuccess);
    }
    setIsDisable(false);
  };
  return <Form
    name="register"
    style={{ width: 500 }}
    onFinish={onFinish}
    layout='vertical'
    initialValues={{ 'email': email }}
  >
    <Form.Item<FieldType>
      name="email"
      label="Email:"
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        { required: true, message: 'Please input your old password!' }
      ]}
    >
      <Input disabled={isDisable} placeholder="Input your email" />
    </Form.Item>

    {havePassword && <Form.Item<FieldType>
      name="password"
      label="Confirm Password:"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password disabled={isDisable} placeholder="Input your password" />
    </Form.Item>}

    <Form.Item >
      <Button type="primary" loading={isDisable} disabled={isDisable} htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
}

export default ChangeEmail
