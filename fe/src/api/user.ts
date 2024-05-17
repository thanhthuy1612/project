import { GetStaticProps } from 'next';
import { get, post } from './base';
import { url } from './url';
import { IUser } from '../interface/IUser';

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
