import express, { Express, Request, Response } from "express";
import { TrafficImageList } from "../db/models/trafficImage";



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

// Get traffic images based on the camera id
trafficImageRouter.get('/trafficimages/:cameraId', async (req:Request, res:Response)=>{
    try {
        const data = await TrafficImageList.find({CameraID: req.params.cameraId});
        if(data.length === 0) throw new Error("No traffic images found");
        res.send(data);
    }catch(e) {
        res.status(400).send("Invalid camera id");
    }
})

//Get traffic images based on location 
trafficImageRouter.get('/trafficimages/:latt-:long', async (req:Request, res:Response)=>{
    try {
        const latt : number  = Number(req.params.latt)
        const long : number = Number(req.params.long)
        const data = await TrafficImageList.find({location: {$near: {$geometry: {type: "Point", coordinates: [long, latt]}, $maxDistance: 1000}}});
        res.send(data);
    }catch(e) {
        res.status(400).send("Error");
    }
})

export {trafficImageRouter}