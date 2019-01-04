export interface IUser {
    name: string;
    phone: number;
    role: number;
    _id?: string;
}

export interface ILogin {
    token: string;
    user: IUser;
}

export enum EUserRole {
    Admin = 1,
    Provider = 3,
    Seller = 2
}
