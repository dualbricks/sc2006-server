import app from "./app";
import {updateCarParkAvailbilityLTA } from "./util/carpark-info";
import 'dotenv/config';
import './db/mongoose'


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})

const test = async () : Promise<void> => {
    const start = Date.now()
    await updateCarParkAvailbilityLTA()
    const timeTaken  = Date.now() - start
    console.log(`timetaken for the operation: ${timeTaken} milliseconds`)

    setInterval(async()=>{
        const start = Date.now()
        await updateCarParkAvailbilityLTA()
        const timeTaken  = Date.now() - start
        console.log(`timetaken for the operation: ${timeTaken} milliseconds`)
    }, 1000*60)

}
test()
