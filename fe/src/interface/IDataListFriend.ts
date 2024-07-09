export interface IDataListFriend {
    id: string;
    name?: string;
    image?: string;
    message: IMessage[];
    createdAt?: Date;
    isReadAll?: boolean;
}

export interface IUserFriend {
    id: string;
    username?: string;
    email?: string;
    ava?: string;
    isOwner?: boolean;
    isRead?: boolean;
}

export interface IMessage {
    from: string;
    message?: string;
    createAt?: Date;
}
