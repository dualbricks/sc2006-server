import mongoose, {Schema, model, Model, HydratedDocument, Types} from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' ; 
import { IUser, IUserMethods } from "../../interfaces/db/index";
import { UserStaticModel } from "../../interfaces/db/user";

export type UserModel = Model<IUser, {}, IUserMethods>

// creating user Schema
const userSchema : Schema<IUser, UserStaticModel, IUserMethods> = new Schema<IUser, UserModel, IUserMethods>({
    email: {type: String, 
        required: true, 
        trim: true, 
        lowercase:true, 
        validate(value: string) {
            if(!validator.isEmail(value)) {
                throw new Error("Please provide a valid email!!!")
            }
        }, 
        unique: true},
    password: {
        type: String, 
        required: true,
        trim: true,
        minlength:7,
        validate(value: string){
            if(value.toLowerCase().includes("password")) {
                throw new Error('Password should not contain "password"')
            }
        }},
    tokens: [String],
    savedList: [String],
    avatar: {
        type: Buffer
    }
}, {
    timestamps:true
})
// User methods 

// method for generating auth tokens for a user 
userSchema.method('generateAuthToken', async function generateAuthToken(){
    const user : HydratedDocument<IUser,IUserMethods> = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SERCRET)
    user.tokens.push(token)
    await user.save()
    return token
})

const User = model<IUser, UserStaticModel>('User', userSchema);

