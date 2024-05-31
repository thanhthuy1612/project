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

const publicRoutes: IRouter[] = [
    { id: 1, path: '/', component: Home },
    { id: 2, path: '/login', component: Login, layout: LoginLayout },
];

const privateRoutes: IRouter[] = [
    { id: 3, path: '/profile', component: Profile },
    { id: 4, path: '/settings/profile/account', component: PublicProfile, layout: SettingsLayout },
    { id: 5, path: '/settings/profile/password', component: Password, layout: SettingsLayout },
    { id: 6, path: '/settings/notifications', component: NotificationSetting, layout: SettingsLayout },
    { id: 7, path: '/settings/accountSupport', component: AccountSupport, layout: SettingsLayout },
    { id: 8, path: '/settings/developer', component: Developer, layout: SettingsLayout },
    { id: 9, path: '/message', component: Message, layout: MessageLayout },
    { id: 10, path: '/notification', component: Notification },
];

export { publicRoutes, privateRoutes };
