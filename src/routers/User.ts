import express, { Express, Request, Response, Router } from "express";
import { User } from "../db/models/user";
import { UserAuthInfoRequest } from "../interfaces/request/UserAuthInfoRequest";
import { authToken as auth } from "../middleware/auth" ;
import bcrypt from "bcryptjs";
const userRouter  = express.Router();

//Sign up

userRouter.post('/users',  async (req: Request, res:Response)=>{
    console.log(req);
    const user = new User(req.body);
    console.log(user)
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e){
        console.log(e)
        res.status(400).send("Please provide the required fields.")
    }

})

userRouter.post('/users/login', async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e) {
        console.log(e)
        res.status(400).send("Invalid login")
    }
})


userRouter.post('/users/logout', auth, async (req : UserAuthInfoRequest, res)=>{
    if (req.user) {
        try {
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token != req.token;
            })
            await req.user.save()
            res.send()
        } catch(e) {
            console.log(e)
            res.status(500).send() 
        }
    }
    else {
        res.status(500).send()
    }
})

userRouter.post('/users/logoutAll', auth, async (req: UserAuthInfoRequest, res)=>{
    if(req.user) {
        try{
            req.user.tokens = []
            await req.user.save()
            res.send()     
        } catch(e) {
            return res.status(500).send()
        }
    }

    res.status(500).send()

})
// getting user data
userRouter.get('/users/me', auth, async(req: UserAuthInfoRequest, res)=>{

    res.send({user: req.user, token: req.token});
})

// post saved list to user data 
userRouter.post('/users/me/save', auth, async (req: UserAuthInfoRequest, res)=>{ 
    if(!req.user) return res.status(401).send("Unauthorized");
    try{
        const user = req.user;
        const carParkID = req.body.carParkID;
        console.log(carParkID)
        if(user.savedList.includes(carParkID)) {
            return res.status(400).send("Already saved")
        }
        user.savedList = user.savedList.concat(carParkID);
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})
// post request to remove carpark from saved list
userRouter.post('/users/me/remove', auth, async (req: UserAuthInfoRequest, res)=>{
    if(!req.user) return res.status(401).send("Unauthorized");
    try{
        
        const user = req.user;
        const carParkID = req.body.carParkID;
        console.log(carParkID)
        if(!user.savedList.includes(carParkID)) {
            return res.status(400).send("Not saved")
        }
        user.savedList = user.savedList.filter((id)=> id != carParkID);
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})
// Change password for user
userRouter.patch('/users/me/password', auth, async (req: UserAuthInfoRequest, res)=>{ 
    if(!req.user) return res.status(401).send("Unauthorized");
    try{
        const user = req.user;
        const match = await bcrypt.compare(req.body.oldPassword, user.password)
        if(!match) {
            return res.status(400).send("Incorrect password");
        }
        user.password = req.body.password;
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})

export{ userRouter};