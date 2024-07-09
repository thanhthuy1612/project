export interface ISearchListChat {
    id: string;
    pageNumber: number;
    pageSize: number;
}

export interface ISearchMessage {
    id: string;
    idSearch: string;
}

export interface IChat {
    idChat: string;
    idUser: string;
    pageNumber: number;
    pageSize: number;
}
