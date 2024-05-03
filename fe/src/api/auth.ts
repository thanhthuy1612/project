import { ILogin } from '../interface/ILogin';
import { IUser } from '../interface/IUser';
import { IStatusCode } from '../interface/IStatusCode';
import { get, post, postConnect } from './base';
import { url } from './url';

const path = url.auth;

export const login = async (user: ILogin) => {
    try {
        const res = await post(`${path}/login`, { ...user });
        // Perform localStorage action
        if (res.data.statusCode === IStatusCode.SUCCESS) {
            localStorage.setItem('token', res.data.data.accessToken);
            localStorage.setItem('email', res.data.data.email);
        }
        return { ...res.data };
    } catch (err) {
        console.log(err);
    }
};

export const register = async (user: IUser) => {
    try {
        const res = await post(`${path}/register`, { ...user });
        // Perform localStorage action
        if (res.data.statusCode === IStatusCode.SUCCESS) {
            localStorage.setItem('token', res.data.data.accessToken);
            localStorage.setItem('email', res.data.data.email);
        }
        return { ...res.data };
    } catch (err) {
        console.log(err);
    }
};

export const connect = async (user: IUser) => {
    try {
        const res = await postConnect(`${path}/connect`, { ...user });
        return { ...res.data };
    } catch (err) {
        console.log(err);
    }
};

export const google = async () => {
    try {
        const res = await get(`${path}/google/callback`);
        if (res.data.statusCode === IStatusCode.SUCCESS) {
            localStorage.setItem('token', res.data.data.accessToken);
            localStorage.setItem('email', res.data.data.email);
        }
        return { ...res };
    } catch (err) {
        console.log(err);
    }
};
