import { ResponseData } from './globalClass';
import { HttpMessage, HttpStatus } from './globalEnum';

export const getResponseData: (value: any) => ResponseData<any> = (value) => {
  if (typeof value === 'string') {
    return new ResponseData<string>(value, HttpStatus.ERROR, HttpMessage.ERROR);
  }
  return new ResponseData<any>(value, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
};
