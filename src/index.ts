import { type } from "os";
import app from "./app";
import { CarParkList } from "./interfaces/carpark";
import { updateCarParkAvailbility } from "./util/carpark-info";

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})

const test = async () : Promise<void> => {
    const data : CarParkList|string = await updateCarParkAvailbility("2022-08-18T06:25:54");
    if(typeof data === "string") return;
    else console.log(data.items[0].carpark_data[1]); 
    
}

test();

