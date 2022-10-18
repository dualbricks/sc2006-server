import express, { Express, Request, Response } from "express";
import { type } from "os";
import { AvailabilityPredictor } from "../controllers/availabilityLogger";
import { CarPark } from "../db/models/car";
import { AvailabilityLog } from "../interfaces";
import { fetchCarParks, fetchNearByCarParks } from "../util/db/fetch";
import { fetchAvailbilityLogByParams } from "../util/db/logger";

const logRouter = express.Router();

logRouter.post('/log',async (req:Request, res:Response)=>{
    console.log(req.body)
    const {id, hour, minute, day} = req.body;  
    console.log(day,minute,hour,id)
    try {
        let data: AvailabilityLog[] | undefined = [];
        if(id && hour !== undefined && minute != undefined && day !== undefined) { 
            console.log("1")
             data = await fetchAvailbilityLogByParams(id, hour, minute, day);
        }
        else if(id && hour !== undefined && minute !== undefined) {
            console.log('here')
             data = await fetchAvailbilityLogByParams(id, hour, minute, undefined);
        }
        else if(id && hour !== undefined) { 
            console.log('3')
             data = await fetchAvailbilityLogByParams(id, hour, undefined, undefined);
        }
        else if(id) { 
            console.log('4')
             data = await fetchAvailbilityLogByParams(id, undefined, undefined, undefined);
        }

        if(data) {
            const predictedLots = AvailabilityPredictor(data);
            res.status(200).send(predictedLots);
        }
    }catch(e) {
        throw e;
    }
    
})

export {logRouter}


