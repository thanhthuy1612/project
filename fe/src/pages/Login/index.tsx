import React from 'react';
import { Menu, type MenuProps } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../lib/hooks';
import { resetStateLogin } from '../../lib/features/login';
import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';
import HeaderLogin from './components/HeaderLogin';
import FooterLogin from './components/FooterLogin';

enum AuthMenu {
  LOGIN = 0,
  REGISTER = 1
}

const Login: React.FC = () => {
  const [auth, setAuth] = React.useState<AuthMenu>(AuthMenu.LOGIN);

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(resetStateLogin())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const items: MenuProps['items'] = [
    {
      label: 'Login',
      key: AuthMenu.LOGIN,
      icon: <LoginOutlined />,
      style: {
        flexBasis: '50%',
        borderTopLeftRadius: '0.75rem',
      },
    },
    {
      label: 'Register',
      key: AuthMenu.REGISTER,
      icon: <UserAddOutlined />,
      style: {
        flexBasis: '50%',
        borderTopRightRadius: '0.75rem',
      },
    },
  ];

  const onClickMenu: MenuProps['onClick'] = (e) => {
    setAuth(Number(e.key));
  };

  const renderBody = () => {
    switch (auth) {
      case AuthMenu.LOGIN:
        return <FormLogin />
      case AuthMenu.REGISTER:
        return <FormRegister />
    }
  }

  return (
    <div className="flex min-h-screen w-[100%] items-center justify-center bg-cover bg-center bg-primaryBlueLight from-transparent to-black">
      <div className="min-w-[600px] justify-center bg-primaryGrayLight rounded-xl shadow-2xl">
        <Menu
          defaultSelectedKeys={[AuthMenu.LOGIN.toString()]}
          onClick={onClickMenu}
          style={{ display: 'flex', backgroundColor: 'transparent', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }}
          selectedKeys={[auth.toString()]}
          mode="horizontal"
          items={items}
        />
        <div className='flex flex-col my-[50px] mx-[100px] items-center justify-center text-primaryBlueDark'>
          <HeaderLogin
            title={auth === AuthMenu.LOGIN ? 'Login' : 'Register'}
            Component={auth === AuthMenu.LOGIN ? LoginOutlined : UserAddOutlined}
          />
          {renderBody()}
          <FooterLogin />
        </div>
      </div>
    </div>
  );
}

export default Login