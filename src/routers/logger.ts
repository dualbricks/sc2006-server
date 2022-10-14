import express, { Express, Request, Response } from "express";
import { CarPark } from "../db/models/car";
import { fetchCarParks, fetchNearByCarParks } from "../util/db/fetch";
import { fetchAvailbilityLog } from "../util/db/logger";

const logRouter = express.Router();

logRouter.get('/log/:id/:hour/:minute/:day',async (req:Request, res:Response)=>{
    console.log(req.params)
    const id : string = req.params.id;
    const hour: number = Number(req.params.hour);
    const minute: number = Number(req.params.minute);
    const day: number = Number(req.params.day);
    try {
        const data = await fetchAvailbilityLog(id,hour,minute,day);
        res.send(data);
    }catch(e) {
        throw e;
    }
    
})

export {logRouter}


