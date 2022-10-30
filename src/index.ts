import 'dotenv/config';
import './db/mongoose';
import './db/Logger';
import app from "./app";
import {updateCarParkAvailbilityLTA, CarParkAvailabilityScheduler } from "./util/carpark-info";
import { APITokenScheduler, trafficImageScheduler, uploadTrafficImages } from "./controllers/trafficImageController";
import {UploadNewAvailbilityLogScheduler } from "./controllers/availabilityLogger";
import { getAPIKey } from './util/map/map';

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})

CarParkAvailabilityScheduler();
// DO NOT RUN THIS FOR THE MOMENT. IT WILL OVERLOAD THE SERVER
APITokenScheduler();
trafficImageScheduler();
