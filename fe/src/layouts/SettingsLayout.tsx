import React from "react";
import Header from "../components/header/Header";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import {
  BellOutlined,
  LinkOutlined,
  SettingOutlined,
  KeyOutlined,
  UserOutlined,
  SafetyCertificateOutlined
}
  from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import HeaderSettings from "./components/HeaderSettings";


const { Sider } = Layout;
export interface ISettingsLayout {
  children: React.ReactNode;
}

type MenuItem = Required<MenuProps>['items'][number];


const SettingsLayout: React.FC<ISettingsLayout> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = React.useState<any>()
  const [breadcrumb, setBreadcrumb] = React.useState<ItemType[]>()
  const location = useLocation();
  const navigate = useNavigate()

  const items: MenuItem[] = [
    {
      key: 'profile',
      label: 'Profile settings',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'account',
          label: 'Public profile',
          icon: <UserOutlined />,
          onClick: () => { navigate('/settings/profile/account') }
        },
        {
          key: 'password',
          label: 'Password & Email',
          icon: <KeyOutlined />,
          onClick: () => { navigate('/settings/profile/password') }
        },
      ],
    },
    {
      key: 'notifications',
      label: 'Notifications',
      icon: <BellOutlined />,
      onClick: () => { navigate('/settings/notifications') }
    },
    {
      key: 'accountSupport',
      label: 'Account support',
      icon: <SafetyCertificateOutlined />,
      onClick: () => { navigate('/settings/accountSupport') }
    },
    {
      key: 'developer',
      label: 'Developer',
      icon: <LinkOutlined />,
      onClick: () => { navigate('/settings/developer') }
    },
  ];

  React.useEffect(() => {
    const getBreadcrumb = () => {
      let breadcrumbArray: any[] = items
      const arrayPath = location.pathname.split('/settings/')
      const result: ItemType[] = arrayPath[1].split('/').reduce((res: ItemType[], name: string) => {
        const filter = breadcrumbArray.filter(item => item?.key === name)
        if (filter.length) {
          breadcrumbArray = filter[0]?.children
          res.push({
            title: filter[0]?.label
          })
          setSelectedMenu(filter[0])
        }
        return res
      }, [
        {
          title: 'Settings'
        }
      ])
      setBreadcrumb(result)
    }
    getBreadcrumb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh', minWidth: '1080px' }}>
      <Header />
      <Layout>
        <Sider
          width={250}
          style={{ overflow: 'auto', background: colorBgContainer, minHeight: '100%' }}
        >
          <Menu
            defaultSelectedKeys={[selectedMenu?.key ?? '']}
            defaultOpenKeys={['profile']}
            mode="inline"
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[selectedMenu?.key ?? '']}
          />
        </Sider>
        <Layout className=" bg-bgColor px-[24px] pb-[24px] overflow-auto">
          <Breadcrumb
            className="py-[16px]"
            items={breadcrumb}
          >
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%'
            }}
          >
            <HeaderSettings title={selectedMenu?.label ?? ''} />
            {children}
          </div>
        </Layout>
      </Layout>
    </Layout >
  );
};

export default SettingsLayout;
