import { AvailabilityLogdb } from "../../db/models/availabilityLogger";
import axios, {} from "axios";

export const fetchAvailbilityLogByParams = async (id: string, hour: number|undefined, minute: number|undefined, day: number|undefined )=> {
    console.log(id, hour, minute, day)
    try{
        if(id && hour !== undefined && minute !==undefined && day !== undefined) {
            console.log('1')
            const data = await AvailabilityLogdb.find({$and: [{CarParkID: id}, {Hour: hour}, {Minute: minute}, {Day: day}]});
            return data
        }
        else if(id && hour !== undefined && minute !== undefined) {
            const data = await AvailabilityLogdb.find({$and: [{CarParkID: id}, {Hour: hour}, {Minute: minute}]});
            return data
        }
        else if(id && hour !== undefined) {
            const data = await AvailabilityLogdb.find({$and: [{CarParkID: id}, {Hour: hour}]});
            return data
        }
        else if(id) {
            const data = await AvailabilityLogdb.find({CarParkID: id});
            return data
        }
        
    }catch(e) {
        console.log(e);
        throw new Error("Not available at the moment.");
    }

}
