import { GetStaticProps } from 'next';
import { get, post } from './base';
import { url } from './url';

const path = url.account;

export const getAll: GetStaticProps = async () => {
  const res = await get(path);
  return res;
};

export const getUserByEmail = async (email: string) => {
  const res = await post(`${path}/email`, { email });
  return res;
};
