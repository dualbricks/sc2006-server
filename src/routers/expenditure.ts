import express, { Express, Request, Response } from "express";
import { ExpenditureLog } from "../db/models/expenditureLog";
import { expenditureRecord } from "../interfaces/db/expenditureRecord";
import { UserAuthInfoRequest } from "../interfaces/request/UserAuthInfoRequest";
import {authToken as auth} from "../middleware/auth";
const expenditureRouter = express.Router();

expenditureRouter.post('/e',auth, async (req:UserAuthInfoRequest, res:Response)=>{
    
    if(!req.user) return res.status(401).send("Unauthorized");

    const expenditure = new ExpenditureLog({
        carParkID: req.body.carParkID,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        cost: req.body.cost,
        owner: req.user._id
    })

    try{
        await expenditure.save();
        res.status(201).send(expenditure);
    }catch(e){
        res.status(400).send(e);
    }
})
// GET ?Completed
// GET ?limit=&skip=
// GET ?sortBy=createdAt:desc

expenditureRouter.get('/e',auth, async (req:UserAuthInfoRequest, res:Response)=>{
    if(!req.user) return res.status(401).send("Unauthorized");
    type sortQuery = {
        [key: string]: number;
    }
    const match = {}
    const sort : sortQuery= {}

    if(req.query.sortBy) {
        const parts : string[] = req.query.sortBy.toString().split(':');
        sort[parts[0] as keyof sortQuery ] = parts[1] === 'desc' ? -1 : 1;
    }

    try{
        const user = req.user;
        if(req.query.limit && req.query.skip){
            await req.user.populate({path: 'expenditure', options: {limit: parseInt(req.query.limit as string), skip: parseInt(req.query.skip as string), sort}});
            res.send(req.user.expenditure);
        }
    }catch(e){
        res.status(500).send(e);
    }

})
// TO BE FIXED
// patch expenditure logs
expenditureRouter.patch('/e/:id',auth, async (req:UserAuthInfoRequest, res:Response)=>{
    if(!req.user) return res.status(401).send("Unauthorized");
    const updates = Object.keys(req.body);
    const allowedUpdates = ['carParkID', 'startTime', 'endTime', 'cost'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
    if(!isValidOperation) return res.status(400).send({error: "Invalid updates"});
    try{
        const expenditure = await ExpenditureLog.findOne({_id: req.params.id, owner: req.user._id}) ;
        if(!expenditure) return res.status(404).send();
        updates.forEach((update)=> expenditure[update as keyof ] = req.body[update]);
        await expenditure.save();
        res.send(expenditure);
    }catch(e){
        res.status(400).send(e);
    }
})

// delete expenditure logs by id 
expenditureRouter.delete('/e/:id',auth, async (req:UserAuthInfoRequest, res:Response)=>{
    if(!req.user) return res.status(401).send("Unauthorized");
    try{
        const expenditure = await ExpenditureLog.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!expenditure) return res.status(404).send();
        res.send(expenditure);
    }catch(e){
        res.status(500).send(e);
    }
}

export {expenditureRouter}


