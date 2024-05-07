import React from "react";

export interface IDefaultLayout {
  children: React.ReactNode;
}

const LoginLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <>{children}</>
  );
};

export default LoginLayout;