import React from 'react';
import { Image } from 'antd';
import avaImg from "../../assets/ava.png";
import bannerImg from "../../assets/banner.png";

export interface IProfileImgProps {
  ava?: string;
  banner?: string;
}

const ProfileImg: React.FC<IProfileImgProps> = ({ ava, banner }) => {
  return (
    <div className='relative'>
      <div className='flex justify-center items-center h-[400px] overflow-hidden !rounded-[20px] shadow-xl'>
        <Image
          width={'100%'}
          height={'100%'}
          src={banner}
          className='object-cover rounded-[20px]'
          fallback={bannerImg}
        />
      </div>
      <div className=' absolute flex justify-center items-center bottom-[-80px] left-[50px] rounded-[50%] overflow-hidden ring-primaryBlueMedium ring-offset-8 ring shadow-2xl w-[270px] h-[270px]'>
        <Image
          width={'100%'}
          height={'100%'}
          src={ava}
          className='object-cover rounded-[50%]'
          fallback={avaImg}
        />
      </div>
    </div>
  )
}

export default ProfileImg