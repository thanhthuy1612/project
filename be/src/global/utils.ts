import { User } from 'src/models/UserScheme';
import { ResponseData } from './globalClass';
import { HttpMessage, HttpStatus } from './globalEnum';

export const getResponseData: (value: any) => ResponseData<any> = (value) => {
  if (typeof value === 'string') {
    return new ResponseData<string>(value, HttpStatus.ERROR, HttpMessage.ERROR);
  }
  return new ResponseData<any>(value, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
};

export const returnUser = (value: User) => {
  return {
    id: value?._id,
    username: value?.username,
    email: value?.email,
    banner: value?.banner,
    ava: value?.ava,
    gender: value?.gender,
    phone: value?.phone,
    prefix: value?.prefix,
    bio: value?.bio,
    havePassword: Boolean(value?.password),
    timeJoin: value?.timeJoin,
  };
};

export const returnSearch = (value: User) => {
  return {
    id: value?._id,
    username: value?.username,
    email: value?.email,
    ava: value?.ava,
  };
};

export const returnListMessage = (value: any) => {
  return {
    id: value?.id,
    listUser: value?.listUser,
    name: value?.name,
    image: value?.image,
    createdAt: value?.createdAt,
  };
};
