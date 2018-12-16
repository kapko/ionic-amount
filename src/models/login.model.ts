export interface IUser {
    name: string;
    phone: number;
    _id?: string;
}

export interface ILogin {
    token: string;
    user: IUser;
}