import React from 'react';
import ProfileImg from './ProfileImg';
import ProfileInfo from './ProfileInfo';
import { useAppSelector } from '../../lib/hooks';

const Profile: React.FC = () => {
  const { ava, banner, username, email, timeJoin, gender, bio, phone, prefix } = useAppSelector(state => state.user);
  return (
    <div className='m-[20px]'>
      <ProfileImg
        ava={ava}
        banner={banner}
        username={username}
      />
      <ProfileInfo
        username={username}
        email={email}
        timeJoin={timeJoin}
        gender={gender}
        bio={bio}
        phone={phone}
        prefix={prefix}
      />
    </div>
  )
}

export default Profile