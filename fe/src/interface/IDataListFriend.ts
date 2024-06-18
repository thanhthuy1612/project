export interface IDataListFriend {
    id: string
    listUser: IUserFriend[];
    name?: string;
    image?: string;
    message: IMessage[];
    createdAt?: Date;
}

export interface IUserFriend {
    id: string;
    username: string;
    email: string;
    ava?: string;
    isOwner?: boolean;
}

export interface IMessage {
    from: string;
    message?: string;
    createAt?: Date;
}
