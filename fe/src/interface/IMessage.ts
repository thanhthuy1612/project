export interface IMessage {
    id?: string;
    from?: string;
    message?: string;
    createAt?: Date;
    idChat?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface ISocket {
    from?: string;
    message?: string;
    idChat?: string;
    pageSizeListMessage?: number;
    pageSizeListFriendMessage?: number;
    pageNumberListMessage?: number;
    pageNumberListFriendMessage?: number;
}

export interface IListUser {
    id?: string;
    username?: string;
    email?: string;
    ava?: string;
    isOwner?: boolean;
    isRead?: string;
}
