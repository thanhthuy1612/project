import { ISearchListChat, ISearchMessage } from '../interface/ISearchListChat';
import { post } from './base';
import { url } from './url';

const path = url.chat;

export const getListChat = async (item: ISearchListChat) => {
    try {
        const res = await post(`${path}/list`, { ...item });
        return { ...res };
    } catch (err) {
        console.log(err);
    }
};

export const getMessage = async (item: ISearchListChat) => {
    try {
        const res = await post(`${path}/message`, { ...item });
        return { ...res };
    } catch (err) {
        console.log(err);
    }
};

export const searchFriendChats = async (item: ISearchMessage) => {
    try {
        const res = await post(`${path}/search`, { ...item });
        return { ...res };
    } catch (err) {
        console.log(err);
    }
};
