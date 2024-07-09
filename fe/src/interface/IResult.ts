import { IStatusCode } from './IStatusCode';

export interface IResult {
    data: any;
    message: string;
    statusCode: IStatusCode;
}
