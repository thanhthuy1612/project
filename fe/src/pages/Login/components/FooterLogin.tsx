import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { google } from '../../../api/auth';
import config from '../../../config';
import { useAppDispatch } from '../../../lib/hooks';
import { updateUser } from '../../../lib/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import { useNotification } from '../../../utils/useNotification';

const FooterLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setNotification } = useNotification()
  const connectGoogle = async (credentialResponse: any) => {
    const res = await google(credentialResponse.credential)
    const onSuccess = () => {
      dispatch(updateUser(res.data))
      navigate('/')
    }
    setNotification(res, 'Logged in successfully', onSuccess)
  }

  return (
    <div className='w-[100%] mt-[10px]'>
      <Flex className='w-[100%] justify-between items-center mb-[15px]'>
        <div className='border-b-[2px] h-[0px] border-primaryBlueDark basis-[45%]'></div>
        <div className='w-[100%] basis-[10%] flex justify-center'>OR</div>
        <div className='border-b-[2px] h-[0px] border-primaryBlueDark basis-[45%]'></div>
      </Flex>
      <Flex className='justify-center'>
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
          <GoogleLogin
            width={400}
            useOneTap
            onSuccess={connectGoogle}
            text='continue_with'
            type='standard'
            onError={() => {
              console.log('Login Failed');
            }}
            theme='filled_black'
            size='large'
            shape='pill'
            locale='en'
          />
        </GoogleOAuthProvider>
      </Flex>
    </div>
  )
}
export default FooterLogin