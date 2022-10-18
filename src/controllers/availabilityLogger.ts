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

 export const AvailabilityPredictor = (data: AvailabilityLog[])=> {
    let availabilityArr = {
        C: 0,
        Y: 0,
        H: 0,
    }
    let count = 0;
    data.forEach((item: AvailabilityLog)=> {
        item.AvailableLots.forEach((lot: lotType)=> {
            if(lot.lotType === 'C') {
                availabilityArr.C += lot.AvailableLots;
            }
            else if(lot.lotType === 'Y') {
                availabilityArr.Y += lot.AvailableLots;
            }
            else if(lot.lotType === 'H') {
                availabilityArr.H += lot.AvailableLots;
            }
        })
        count++;
    })

    availabilityArr.C = Math.floor(availabilityArr.C/count);
    availabilityArr.Y = Math.floor(availabilityArr.Y/count);
    availabilityArr.H = Math.floor(availabilityArr.H/count);
    return availabilityArr;
 }
