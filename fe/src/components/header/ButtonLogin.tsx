import React from 'react';
import { Avatar, Button, Dropdown, MenuProps, Modal } from 'antd';
import {
  BellOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { googleLogout } from '@react-oauth/google';
import { resetStateUser, updateUser } from '../../lib/features/userSlice';
import { getUserByEmail } from '../../api/user';
import { IStatusCode } from '../../interface/IStatusCode';
import { updateIsLoadingPage } from '../../lib/features/reload';
import LoadingSpin from '../loading/LoadingSpin';

const ButtonLogo: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false)
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const navigate = useNavigate()
  const { username } = useAppSelector(state => state.user)
  const { isLoadingPage } = useAppSelector(state => state.reload)

  const dispatch = useAppDispatch();

  const onClickLogout = () => {
    googleLogout();
    dispatch(resetStateUser());
    localStorage.clear();
    setModalOpen(false);
    navigate('/')
  }

  async function isConnected() {
    dispatch(updateIsLoadingPage(true))
    const email = localStorage.getItem('email')
    if (email && localStorage.getItem('token')) {
      const res = await getUserByEmail(email)
      if (res?.statusCode === IStatusCode.SUCCESS) {
        dispatch(updateUser(res.data))
      } else {
        localStorage.clear()
      }
    } else {
      navigate('/');
    }
    dispatch(updateIsLoadingPage(false))
  }

  window.onload = () => {
    isConnected();
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '1':
        navigate('/profile')
        break;
      case '3':
        navigate('/settings/profile/account')
        break;
      case '4':
        setModalOpen(true)
        break;
    }
  };

  const items = [
    {
      key: '1',
      label: username,
      icon: <HomeOutlined />
    },
    {
      key: '2',
      label: 'Notification',
      icon: <BellOutlined />
    },
    {
      key: '3',
      label: 'Settings',
      icon: <SettingOutlined />
    },
    {
      key: '4',
      label: 'Logout',
      icon: <LogoutOutlined />
    },
  ];

  const onClickLogin = () => {
    setIsDisable(true)
    navigate('/login')
  }

  const renderButtonLogin = () => {
    return !username ?
      <Button
        icon={<LoginOutlined />}
        disabled={isDisable}
        onClick={onClickLogin}
        className=' ring-primaryBlue ring-offset-2 ring m-[10px]'
      >
        Login
      </Button> :
      <Dropdown menu={{ items, onClick: handleMenuClick, style: { minWidth: '200px', backgroundColor: '#FBF9F1' } }} arrow>
        <Avatar
          className=' bg-primaryWhite text-primaryBlueDark m-[10px] ring-primaryBlue ring-offset-2 ring'
          icon={<UserOutlined />} />
      </Dropdown>
  }

  return (
    <div className='flex items-center'>
      {isLoadingPage ? <LoadingSpin /> : renderButtonLogin()}
      <Modal
        title="Confirm logout?"
        centered
        open={modalOpen}
        onOk={onClickLogout}
        onCancel={() => setModalOpen(false)}
      >
        Are you sure you want to log out?
      </Modal>
    </div>
  );
}
export default ButtonLogo
