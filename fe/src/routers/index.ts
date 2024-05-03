import { IRouter } from '../interface/IRouter';
import LoginLayout from '../layouts/LoginLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';

const publicRoutes: IRouter[] = [
    { id: 1, path: '/', component: Home },
    { id: 2, path: '/login', component: Login, layout: LoginLayout },
];

const privateRoutes: IRouter[] = [];

export { publicRoutes, privateRoutes };