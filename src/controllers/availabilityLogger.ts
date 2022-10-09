import axios, {AxiosRequestHeaders} from "axios";
import { AvailabilityLog } from "../interfaces/db/availabilityLogger";
import { carParkInfoLTA, carParkListLTA, lotType } from "../interfaces";
import { getCarParkAvailbilityLTA } from "../util/carpark-info";
import { CarPark } from "../db/models/car";
import { AvailabilityLogdb } from "../db/models/availabilityLogger";
import { setInterval, setTimeout } from "timers/promises";

import * as schedule  from 'node-schedule'

 export const UploadNewAvailbilityLogScheduler = async (): Promise<void> => {
    var rule  = new schedule.RecurrenceRule();

    rule.minute = [new schedule.Range(0,59, 30)];

    schedule.scheduleJob(rule, async ()=>{
        await updateAvailibilityLog();
        console.log("done");
    })

 }


 const getRoundedDate = (minutes:number, d=new Date())=> {
    let ms = 1000 * 60 * minutes;
    let roundedDate = new Date(Math.round(d.getTime()/ms)*ms)
    return roundedDate;
 }



 const updateAvailibilityLog =async () => {
    const d = new Date();
    const minute = d.getMinutes()
    const hour = d.getHours();
    const day = d.getDay()
    const data : void |carParkInfoLTA[] = await getCarParkAvailbilityLTA();
    let availabilityArr : AvailabilityLog[] = [];
    if(data) {
        data.forEach((carPark: carParkInfoLTA)=> {
            var item : AvailabilityLog = {
                CarParkID: carPark.CarParkID,
                AvailableLots: carPark.AvailableLots as lotType[],
                Hour: hour,
                Minute: minute,
                Day: day
            };

            availabilityArr.push(item)
        })

    }

    await AvailabilityLogdb.insertMany(availabilityArr);


 }
