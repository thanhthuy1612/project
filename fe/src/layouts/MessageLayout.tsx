import { Breadcrumb, Layout, theme } from 'antd';
import React from 'react';
import Header from '../components/header/Header';
import ListFriend from '../pages/message/ListFriend';

const { Sider } = Layout;
export interface IMessageLayoutProps {
  children: React.ReactNode;
}

const MessageLayout: React.FC<IMessageLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: '100vh', minWidth: '1080px' }}>
      <Header />
      <Layout>
        <Sider
          width={350}
          style={{ background: colorBgContainer, minHeight: '100%' }}
        >
          <ListFriend />
        </Sider>
        <Layout className=" bg-bgColor px-[24px] pb-[24px] overflow-auto h-[100%] flex flex-col justify-around">
          <Breadcrumb
            className="py-[16px]"
            items={[
              { title: 'Message' },
            ]}
          >
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '90%'
            }}
          >
            {children}
          </div>
        </Layout>
      </Layout>
    </Layout >
  )
}

export default MessageLayout