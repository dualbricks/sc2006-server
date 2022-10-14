import { AvailabilityLogdb } from "../../db/models/availabilityLogger";
import axios, {} from "axios";

export const fetchAvailbilityLog = async (id: string, hour: number, minute: number, day: number )=> {
    try{
        const data = await AvailabilityLogdb.find({CarParkID: id, Hour: hour, Minute: minute, Day: day});
        return data
    }catch(e) {
        console.log(e);
        throw new Error("Not available at the moment.");
    }

}
