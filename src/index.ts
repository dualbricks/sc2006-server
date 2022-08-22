import app from "./app";
import {insertCarParkAvailbilityLTA, updateCarParkAvailbilityLTA } from "./util/carpark-info";
import 'dotenv/config';
import './db/mongoose'
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})

const test = async () : Promise<void> => {
    await updateCarParkAvailbilityLTA()
    setInterval(async()=>{
        await updateCarParkAvailbilityLTA()
        console.log("done")
    }, 1000*60)

}
test()
