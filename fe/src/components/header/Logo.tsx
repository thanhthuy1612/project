import React from 'react';
import logo from '../../assets/logo.png'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const navigate = useNavigate()
  const backHomePage = () => {
    navigate('/')
  }
  return (
    <Button size='large' type='link' className='text-primaryWhite p-0 flex items-center' onClick={backHomePage}>
      <img src={logo} alt="logo" width={28} height={28} className='rounded-[50%] ring-primaryBlue ring-offset-2 ring' />
      <div className='ml-[15px] text-primaryWhite text-2xl bg-gradient-to-r from-primaryBlue to-yellowPastel text-transparent bg-clip-text'>NatureHues</div>
    </Button>
  );
}

export default Logo