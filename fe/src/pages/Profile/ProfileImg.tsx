import React from 'react';
import { Button, Descriptions, Flex, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import avaImg from "../../assets/ava.png";
import bannerImg from "../../assets/banner.png";
import { useNavigate } from 'react-router-dom';

export interface IProfileImgProps {
  ava?: string;
  banner?: string;
  username?: string;
}

const ProfileImg: React.FC<IProfileImgProps> = ({ ava, banner, username }) => {
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate('/settings/profile/account')
  }
  return (
    <div className='relative'>
      <Flex className='justify-center items-center h-[400px] overflow-hidden !rounded-[20px] shadow-xl'>
        <Image
          width={'100%'}
          height={'100%'}
          src={banner}
          className='object-cover rounded-[20px]'
          fallback={bannerImg}
        />
      </Flex>
      <Flex className='absolute bottom-[0px] left-[50px] items-end'>
        <Flex className='justify-center items-center rounded-[50%] overflow-hidden ring-primaryBlueMedium ring-offset-8 ring shadow-2xl w-[270px] h-[270px]'>
          <Image
            width={'100%'}
            height={'100%'}
            src={ava}
            className='object-cover rounded-[50%]'
            fallback={avaImg}
          />
        </Flex>
      </Flex>
      <Flex className='text-primaryBlueDark ml-[350px] mb-[50px] mt-[20px] mr-[20px] justify-between'>
        <Descriptions
          column={1}
          items={[
            {
              key: '1',
              label: 'UserName',
              children: username,
            },
            {
              key: '2',
              label: "Friends",
              children: '200'
            },
            {
              key: '3',
              label: "Post",
              children: '200'
            },
          ]}
        />
        <Flex className=' justify-end'>
          <Button
            icon={<EditOutlined />}
            onClick={handleEditProfile}
          >
            Edit profile
          </Button>
        </Flex>
      </Flex>
    </div>
  )
}

export default ProfileImg