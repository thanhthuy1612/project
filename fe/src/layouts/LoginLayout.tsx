import React from "react";

export interface IDefaultLayout {
  children: React.ReactNode;
}

const LoginLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <body className=" w-[100%]">{children}</body>
  );
};

export default LoginLayout;