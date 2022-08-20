import app from "./app";
import {updateCarParkAvailbilityLTA } from "./util/carpark-info";
import 'dotenv/config';

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})

const test = async () : Promise<void> => {
    await updateCarParkAvailbilityLTA();
}
test();

