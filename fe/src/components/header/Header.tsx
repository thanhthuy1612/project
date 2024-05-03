import React from 'react';
import Logo from './Logo';
import ButtonLogo from './ButtonLogin';

const Header: React.FC = () => {
  return (
    <header className="w-[100%] px-[20px] h-[60px] flex items-center bg-gradient-to-r from-primaryBlueDark to-primaryBlueLight justify-between">
      <Logo />
      <ButtonLogo />
    </header>
  );
}
export default Header