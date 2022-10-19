import express, { Express, Request, Response } from "express";
import { CarPark } from "../db/models/car";
import { geoLocation } from "../interfaces/db";
import { fetchCarParks, fetchNearByCarParks } from "../util/db/fetch";
import { getGeolocation } from "../util/map/map";

const carParkRouter = express.Router();

carParkRouter.get('/carparks/:latt-:long',async (req:Request, res:Response)=>{
    const latt : number  = Number(req.params.latt)
    const long : number = Number(req.params.long)
    try{
        const data = await fetchNearByCarParks(latt,long)
        res.send(data);
    }catch(e) {
        res.status(400).send(e)
    }
   
})

carParkRouter.get('/carparks/postalcode/:postal',async (req:Request, res:Response)=>{
    try {
        const postalCode = req.params.postal;
        const location = await getGeolocation(postalCode) as geoLocation;
        const data = await fetchNearByCarParks(location.latt,location.long)
        res.send(data);
    }catch(e) {
        res.status(400).send(e);
    }
})

carParkRouter.get('/carparks', async (req:Request, res:Response)=>{
    const data =  await fetchCarParks()
    res.send(data);
})

export {carParkRouter}


