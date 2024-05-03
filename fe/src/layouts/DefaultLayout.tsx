import React from "react";
import Header from "../components/header/Header";

export interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <main className="w-[100%]">
      <Header />
      <div className="bg-primaryWhite min-h-screen">{children}</div>
    </main>
  );
};

export default DefaultLayout;
