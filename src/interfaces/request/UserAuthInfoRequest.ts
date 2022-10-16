import { Request } from "express";
import { Document, ObjectId, PopulatedDoc, Types } from "mongoose";
import { IUser } from "../db";
import { IUserMethods } from "../db";
import { expenditureRecord } from "../db/expenditureRecord";

export interface UserAuthInfoRequest extends Request {
    user?: Document<unknown, any, IUser> & IUser & {
        _id: Types.ObjectId;
        expenditure: PopulatedDoc<Document<unknown, any, expenditureRecord> & expenditureRecord & { _id: ObjectId; }>;
    } & IUserMethods;
    token?: String;
}