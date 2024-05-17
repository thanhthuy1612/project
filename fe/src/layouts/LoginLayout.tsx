import React from "react";

export interface IDefaultLayout {
  children: React.ReactNode;
}

const LoginLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <div className="min-w-[1080px]">{children}</div>
  );
};

export default LoginLayout;