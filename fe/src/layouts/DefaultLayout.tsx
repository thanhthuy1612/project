import React from "react";
import Header from "../components/header/Header";
import { Layout } from "antd";

export interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <Layout style={{ height: '100vh', minWidth: '1080px' }}>
      <Header />
      <div className="bg-bgColor h-[100%] overflow-auto">{children}</div>
    </Layout>
  );
};

export default DefaultLayout;
