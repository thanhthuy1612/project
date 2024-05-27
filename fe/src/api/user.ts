import { post } from './base';
import { url } from './url';
import { IUser } from '../interface/IUser';
import { IChangePassword } from '../interface/IChangePassword';
import { IChangeEmail } from '../interface/IChangeEmail';

const path = url.account;

export const getUserByEmail = async (email: string) => {
    try {
        const res = await post(`${path}/email`, { email });
        return { ...res.data };
    } catch (err) {
        console.log(err);
    }
};

export const updateUserApi = async (user: IUser) => {
    try {
        const res = await post(`${path}/username`, { ...user });
        return { ...res.data };
    } catch (err) {
        console.log(err);
    }
};


export const changePassword = async (user: IChangePassword) => {
    try {
        const res = await post(`${path}/change/password`, { ...user });
        return { ...res.data };
    } catch (err) {
        console.log(err);
    }
};

export const changeEmail = async (user: IChangeEmail) => {
    try {
        const res = await post(`${path}/change/email`, { ...user });
        return { ...res.data };
    } catch (err) {
        console.log(err);
    }
};