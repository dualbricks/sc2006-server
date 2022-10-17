import jwt, { JwtPayload } from 'jsonwebtoken';
import { Express, Request, Response } from "express";
import { User } from '../db/models/user';
import {UserAuthInfoRequest} from '../interfaces/request/UserAuthInfoRequest'
type Next = () => void | Promise<void>;

export const authToken = async (req : UserAuthInfoRequest, res: Response, next: Next) : Promise<void> => {
    console.log('checking auth');
    try{
        const token = req.header('Authorization')?.replace('Bearer', '').trim()
        console.log(token);
        if(token) {
            const decoded : JwtPayload  = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
            console.log(decoded);
            const user = await User.findOne({_id: decoded._id, "tokens.token": token})
            if(!user) {
                throw new Error()
            }
            req.user = user;
            req.token = token;
        }
        next();

    } catch(e) {
        res.status(401).send({error: 'Please authenticate.'})
        console.log(e)
    }

}