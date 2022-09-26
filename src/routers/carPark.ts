import express, { Express, Request, Response } from "express";
import { CarPark } from "../db/models/car";
import { fetchNearByCarParks } from "../util/db/fetch";

const carParkRouter = express.Router();

carParkRouter.get('/carparks/:latt-:long',async (req:Request, res:Response)=>{
    const latt : number  = Number(req.params.latt)
    const long : number = Number(req.params.long)
    const data = await fetchNearByCarParks(latt,long)
    res.send(data);
})

export {carParkRouter}


