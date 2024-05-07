import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { updateIsLoadingForm } from '../../../lib/features/login';
import { register } from '../../../api/auth';
import { IStatusCode } from '../../../interface/IStatusCode';
import { updateNotification } from '../../../lib/features/notification';
import { updateUser } from '../../../lib/features/userSlice';

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  rePassword?: string;
};

const FormRegister: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(true)
  const { isLoadingConnect, isLoadingForm } = useAppSelector(state => state.login)
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setIsDisable(isLoadingConnect || isLoadingForm)
  }, [isLoadingConnect, isLoadingForm])

  // const verifyEmail = async (email: string) => {
  //   try {
  //     const response = await axios.get(
  //       `https://apilayer.net/api/check?access_key=98833bace897548419aca3c0efbf5bd1&email=${email}`
  //     );

  //     const { format_valid, mx_found, smtp_check } = response.data;
  //     const isValid = format_valid && mx_found && smtp_check;

  //     console.log(format_valid, mx_found, smtp_check)
  //     setIsValid(isValid);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.username && values.password && values.email) {
      dispatch(updateIsLoadingForm(true))
      const fetchRegister = await register({ username: values.username, password: values.password, email: values.email })
      if (fetchRegister?.statusCode === IStatusCode.SUCCESS) {
        dispatch(updateUser({ email: fetchRegister.data.email, username: fetchRegister.data.username }))
        navigate('/')
        dispatch(updateNotification({
          type: 'success',
          description: 'Register in successfully'
        }))
      } else {
        dispatch(updateNotification({
          type: 'fail',
          description: fetchRegister.data
        }))
      }
      dispatch(updateIsLoadingForm(false))
    }
  };

  return (
    <Form
      name="register"
      style={{ width: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="username"
        rules={[
          { required: true, message: 'Please input your username!' },
          () => ({
            validator(_, value) {
              if (value.replace(/[^a-z0-9]/gi, '') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Special characters are not allowed in this field.'));
            },
          }),
        ]}
      >
        <Input disabled={isDisable} placeholder="Username" style={{ borderRadius: '50px' }} size="large" prefix={<UserOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
      </Form.Item>

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

      <Form.Item<FieldType>
        name="rePassword"
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
        <Input.Password disabled={isDisable} placeholder="Re-enter password" style={{ borderRadius: '50px' }} size="large" prefix={<KeyOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
      </Form.Item>

      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button loading={isLoadingForm} disabled={isLoadingConnect} type="primary" size='large' style={{ borderRadius: '50px', paddingLeft: '50px', paddingRight: '50px' }} htmlType="submit">
          Create Account
        </Button>
      </Form.Item>
    </Form>
  )
};

export default FormRegister;