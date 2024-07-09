import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { changePassword } from '../../../api/user';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../lib/features/userSlice';
import { useNotification } from '../../../utils/useNotification';

type FieldType = {
  oldPassword?: string;
  newPassword?: string;
  rePassword?: string;
};

const ChangePassword: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);
  const { havePassword, email } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setNotification } = useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsDisable(true)
    if (values?.newPassword && email) {
      const res = await changePassword(
        {
          oldPassword: values?.oldPassword,
          newPassword: values?.newPassword,
          email
        }
      );
      const onSuccess = () => {
        dispatch(updateUser(res.data));
        navigate('/');
      }
      setNotification(res, 'Change password successfully', onSuccess)
    }
    setIsDisable(false);
  };

  return <Form
    name="register"
    style={{ width: 500 }}
    onFinish={onFinish}
    layout='vertical'
    autoComplete="off"
  >
    {havePassword && <Form.Item<FieldType>
      name="oldPassword"
      label="Old Password:"
      rules={[{ required: true, message: 'Please input your old password!' }]}
    >
      <Input.Password disabled={isDisable} placeholder="Input your old password" />
    </Form.Item>}

    <Form.Item<FieldType>
      name="newPassword"
      label="New Password:"
      rules={[
        { required: true, message: 'Please input your new password!' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('oldPassword') !== value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password must be different from the old password!'));
          },
        }),
      ]}
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
            if (!value || getFieldValue('newPassword') === value) {
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
      <Button loading={isDisable} disabled={isDisable} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
}

export default ChangePassword