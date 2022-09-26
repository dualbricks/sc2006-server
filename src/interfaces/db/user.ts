import { HydratedDocument, Types, Model} from "mongoose";

interface token {
    token: string;
}
export interface IUser {
    email: string,
    password: string,
    tokens: token[],
    savedList?: String[],
    avatar?: Buffer
}

export interface IUserMethods {
    generateAuthToken(): Promise<string>,
    toJSON(): Object;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
    findByCredentials(email:string, password:string): Promise<HydratedDocument<IUser,IUserMethods>>
}
