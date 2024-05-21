import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { google } from '../../../api/auth';
import config from '../../../config';
import { IStatusCode } from '../../../interface/IStatusCode';
import { useAppDispatch } from '../../../lib/hooks';
import { updateUser } from '../../../lib/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { updateNotification } from '../../../lib/features/notification';

const FooterLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const connectGoogle = async (credentialResponse: any) => {
    const res = await google(credentialResponse.credential)
    if (res?.statusCode === IStatusCode.SUCCESS) {
      dispatch(updateUser(res.data))
      navigate('/')
      dispatch(updateNotification({
        type: 'success',
        description: 'Logged in successfully'
      }))
    }
  }
  return (
    <div className='w-[100%] mt-[10px]'>
      <div className='flex w-[100%] justify-between items-center mb-[15px]'>
        <div className='border-b-[2px] h-[0px] border-primaryBlueDark basis-[45%]'></div>
        <div className='w-[100%] basis-[10%] flex justify-center'>OR</div>
        <div className='border-b-[2px] h-[0px] border-primaryBlueDark basis-[45%]'></div>
      </div>
      <div className='flex justify-center'>
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
      </div>
    </div>
  )
}
export default FooterLogin