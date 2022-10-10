import app from "./app";
import {updateCarParkAvailbilityLTA } from "./util/carpark-info";
import 'dotenv/config';
import './db/mongoose'
import { trafficImageScheduler, uploadTrafficImages } from "./controllers/trafficImageController";
import {UploadNewAvailbilityLogScheduler } from "./controllers/availabilityLogger";


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})

// const test = async () : Promise<void> => {
//     try {
//         const start = Date.now()
//         await updateCarParkAvailbilityLTA()
//         const timeTaken  = Date.now() - start
//         console.log(`timetaken for the operation: ${timeTaken} milliseconds`)
    
//         setInterval(async()=>{
//             const start = Date.now()
//             await updateCarParkAvailbilityLTA()
//             const timeTaken  = Date.now() - start
//             console.log(`timetaken for the operation: ${timeTaken} milliseconds`)
//         }, 1000*60)

//     }catch(e) {
//         console.log(e)
//     }


// }

updateCarParkAvailbilityLTA();
// DO NOT RUN THIS FOR THE MOMENT.

//UploadNewAvailbilityLogScheduler();
trafficImageScheduler();
