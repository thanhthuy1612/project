import { post } from './base';
import { url } from './url';

const pathGet = url.getFile;
const pathUpload = url.upload;

export const getFile = async (fileName: string) => {
    try {
        const res = await post(pathGet, { fileName });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const uploadFile = async (file: File) => {
    try {
        const input = new FormData();
        input.append('file', file);
        const res = await post(pathUpload, input);
        return res;
    } catch (err) {
        console.log(err);
    }
};
