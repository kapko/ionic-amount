export interface IUser {
    name: string;
    phone: number;
    _id?: string;
}

export interface ILogin {
    token: string;
    user: IUser;
}

export enum EUserRole {
    Admin = 1,
    Editer = 2,
    Seller = 3
}
