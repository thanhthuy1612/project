import React from 'react';
import { Avatar, Button, Dropdown, MenuProps, Modal } from 'antd';
import {
  BellOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { googleLogout } from '@react-oauth/google';
import { resetStateUser, updateUser } from '../../lib/features/userSlice';
import { getUserByEmail } from '../../api/user';
import { IStatusCode } from '../../interface/IStatusCode';
import { updateIsLoadingPage } from '../../lib/features/reload';
import LoadingSpin from '../loading/LoadingSpin';
import { resetStateMessage } from '../../lib/features/message';

const ButtonLogo: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false)
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { username, ava } = useAppSelector(state => state.user)
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
    }
    dispatch(updateIsLoadingPage(false))
  }

  window.onload = () => {
    isConnected();
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (location.pathname === e.key) {
      return;
    }
    switch (e.key) {
      case '/profile':
        navigate(e.key);
        break;
      case '/message':
        navigate(e.key);
        dispatch(resetStateMessage());
        break;
      case '/notification':
        navigate(e.key);
        break;
      case '/settings/profile/account':
        navigate(e.key);
        break;
      case '5':
        setModalOpen(true);
        break;
    }
  };

  const items = [
    {
      key: '/profile',
      label: username,
      icon: <HomeOutlined />
    },
    {
      key: '/message',
      label: 'Message',
      icon: <MessageOutlined />
    },
    {
      key: '/notification',
      label: 'Notification',
      icon: <BellOutlined />
    },
    {
      key: '/settings/profile/account',
      label: 'Settings',
      icon: <SettingOutlined />
    },
    {
      key: '5',
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
          src={ava}
          icon={<UserOutlined />}
        />
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
