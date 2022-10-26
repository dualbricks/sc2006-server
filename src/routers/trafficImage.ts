import express, { Express, Request, Response } from "express";
import { TrafficImageList } from "../db/models/trafficImage";
import { geoLocation } from "../interfaces/db";
import { getGeolocation } from "../util/map/map";



const trafficImageRouter = express.Router();

// Get all traffic images from the database
trafficImageRouter.get('/trafficimages', async (req:Request, res:Response)=>{
    try {
        const data = await TrafficImageList.find({});
        res.send(data);
    }catch(e) {
        res.status(400).send("Error fetching traffic images");
    }
})

//Get traffic images based on location 
trafficImageRouter.get('/trafficimages/:latt-:long', async (req:Request, res:Response)=>{
    try {
        const latt : number  = Number(req.params.latt)
        const long : number = Number(req.params.long)
        const data = await TrafficImageList.find({Location: {$near: {$geometry: {type: "Point", coordinates: [long, latt]}, $maxDistance: 5000}}});
        res.send(data);
    }catch(e) {
        console.log(e)
        res.status(400).send("Error");
    }
})

//Get traffic images based on postal code
trafficImageRouter.get('/trafficimages/p/:postalCode', async (req:Request, res:Response)=>{
    try {
        const postalCode = req.params.postalCode;
        const location = await getGeolocation(postalCode) as geoLocation;
        const data = await TrafficImageList.find({Location: {$near: {$geometry: {type: "Point", coordinates: [location.long, location.latt]}, $maxDistance: 5000}}});
        res.send(data);
    }catch(e) {
        console.log(e)
        res.status(400).send("Error");
    }
})

export {trafficImageRouter}