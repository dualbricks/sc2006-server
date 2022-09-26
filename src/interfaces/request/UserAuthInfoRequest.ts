import { Request } from "express";
import { Document, Types } from "mongoose";
import { IUser } from "../db";
import { IUserMethods } from "../db";

export interface UserAuthInfoRequest extends Request {
    user?: Document<unknown, any, IUser> & IUser & {
        _id: Types.ObjectId;
    } & IUserMethods;
    token?: String;
}