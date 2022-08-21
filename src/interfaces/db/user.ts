import { HydratedDocument, Types, Model} from "mongoose";
import { UserModel } from "../../db/models/user";
export interface IUser {
    email: string,
    password: string,
    tokens: Types.Array<String>,
    savedList?: Types.Array<string>,
    avatar?: Buffer
}

export interface IUserMethods {
    generateAuthToken(): string,
    toJSON(): HydratedDocument<IUser,IUserMethods>;
}
export interface UserStaticModel extends UserModel {
    findByCredentials(email:string, password:string): Promise<HydratedDocument<IUser,IUserMethods>>
}
