import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { updateIsLoadingForm } from '../../../lib/features/login';
import { login } from '../../../api/auth';
import { IStatusCode } from '../../../interface/IStatusCode';
import { updateNotification } from '../../../lib/features/notification';
import { updateUser } from '../../../lib/features/userSlice';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const FormLogin: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(true)
  const { isLoadingConnect, isLoadingForm } = useAppSelector(state => state.login)
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setIsDisable(isLoadingConnect || isLoadingForm)
  }, [isLoadingConnect, isLoadingForm])

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.email && values.password) {
      dispatch(updateIsLoadingForm(true))
      const fetchLogin = await login({ email: values.email, password: values.password, isRemember: values.remember })
      if (fetchLogin?.statusCode === IStatusCode.SUCCESS) {
        dispatch(updateUser({ email: fetchLogin?.data.email, username: fetchLogin.data.username }))
        navigate('/')
        dispatch(updateNotification({
          type: 'success',
          description: 'Logged in successfully'
        }))
      } else {
        dispatch(updateNotification({
          type: 'fail',
          description: fetchLogin.data
        }))
      }
      dispatch(updateIsLoadingForm(false))
    }
  };
  return (
    <Form
      name="login"
      style={{ width: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          { required: true, message: 'Please input your email!' }
        ]}
      >
        <Input disabled={isDisable} placeholder="Email" style={{ borderRadius: '50px' }} size="large" prefix={<MailOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password disabled={isDisable} placeholder="Password" style={{ borderRadius: '50px' }} size="large" prefix={<KeyOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
      </Form.Item>

      <div className='flex justify-between'>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
        >
          <Checkbox disabled={isDisable} className='text-primaryBlueDark'>Remember me</Checkbox>
        </Form.Item>
        <Button disabled={isDisable} type='link' className='!text-primaryBlueDark hover:!text-primaryBlueMedium active:!text-primaryBlueDark'>Forget password?</Button>
      </div>

      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button loading={isLoadingForm} disabled={isLoadingConnect} type="primary" style={{ borderRadius: '50px', paddingLeft: '60px', paddingRight: '60px' }} htmlType="submit" size="large">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
};

export default FormLogin;