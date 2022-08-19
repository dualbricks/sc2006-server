import { type } from "os";
import app from "./app";
import { CarParkList } from "./interfaces/carpark";
import { updateCarParkAvailbility, updateCarParkAvailbilityLTA } from "./util/carpark-info";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})

const test = async () : Promise<void> => {
    await updateCarParkAvailbilityLTA();
}
test();

