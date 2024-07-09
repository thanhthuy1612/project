import { IRouter } from '../interface/IRouter';
import LoginLayout from '../layouts/LoginLayout';
import MessageLayout from '../layouts/MessageLayout';
import SettingsLayout from '../layouts/SettingsLayout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Message from '../pages/message/Message';
import Profile from '../pages/profile/Profile';
import AccountSupport from '../pages/settings/AccountSupport';
import Developer from '../pages/settings/Developer';
import { default as NotificationSetting } from '../pages/settings/Notification';
import Password from '../pages/settings/passwordAndEmail/Password';
import PublicProfile from '../pages/settings/PublicProfile';
import Notification from '../pages/notification/Notification';
import VideoCall from '../pages/message/components/listMessage/videoCall/VideoCall';

const routes: IRouter[] = [
  { id: 1, path: '/', component: Home },
  { id: 2, path: '/login', component: Login, layout: LoginLayout },
  { id: 3, path: '/profile', component: Profile, isPrivate: true },
  { id: 4, path: '/settings/profile/account', component: PublicProfile, layout: SettingsLayout, isPrivate: true },
  { id: 5, path: '/settings/profile/password', component: Password, layout: SettingsLayout, isPrivate: true },
  { id: 6, path: '/settings/notifications', component: NotificationSetting, layout: SettingsLayout, isPrivate: true },
  { id: 7, path: '/settings/accountSupport', component: AccountSupport, layout: SettingsLayout, isPrivate: true },
  { id: 8, path: '/settings/developer', component: Developer, layout: SettingsLayout, isPrivate: true },
  { id: 9, path: '/message', component: Message, layout: MessageLayout, isPrivate: true },
  { id: 10, path: '/notification', component: Notification, isPrivate: true },
  { id: 11, path: '/video-call/:roomName', component: VideoCall, isPrivate: true },
];

export { routes };
