import axios, {AxiosRequestHeaders} from "axios";
import { Types } from "mongoose";
import { TrafficImageList } from "../db/models/trafficImage";

import {geoLocation, TrafficImageData, TraffiImage} from '../interfaces/db'
import { getAPIKey } from "../util/map/map";
import * as schedule from 'node-schedule'

let config: AxiosRequestHeaders = {
    accept: 'application/json',
    AccountKey: process.env.API_KEY
}

export const trafficImageScheduler =  async (): Promise<void>=> {
    var rule = new schedule.RecurrenceRule();
    rule.minute = [new schedule.Range(0,59, 1)];
    schedule.scheduleJob(rule, async ()=> {
        try{
            await uploadTrafficImages();
        }catch(e) {
            console.log(e);
        }
    })
}
export const APITokenScheduler = async (): Promise<void> => {
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(0,6)];
    rule.hour = 0;
    rule.minute = 0;
    //rule.minute = [new schedule.Range(0,59, 1)];
    schedule.scheduleJob(rule, async ()=> {
        try{
            await getAPIKey(process.env.MAP_EMAIL as string, process.env.MAP_PASSWORD as string);
        }catch(e) {
            console.log(e);
        }
    })
}
export const uploadTrafficImages = async (): Promise<void>=> {
    const data : TraffiImage[] = await requestTrafficImages();
    const updatedData  = await updateNameTrafficImage(data);
    try {
        await TrafficImageList.collection.drop()
        await TrafficImageList.ensureIndexes();
        await TrafficImageList.insertMany(updatedData);
    }catch(e){
        console.log(e);
        
    }

}


const requestTrafficImages = async (): Promise<TraffiImage[]> =>{
    let config : AxiosRequestHeaders = {
        Accept: 'application/json',
        AccountKey: process.env.API_KEY
    }
    let url = 'http://datamall2.mytransport.sg/ltaodataservice/Traffic-Imagesv2'
    try {
        const {data} = await axios.get(url, {headers: config});
        return data.value;

    }catch(e) {
        console.log(e);
    }
    return [];
}

const updateNameTrafficImage =  async (trafficData: TraffiImage[]): Promise<TraffiImage[]| void> =>{
    interface mapNameData {
        GeocodeInfo: RoadData[]
    }

    interface RoadData {
        ROAD: String;
    }
    let config : AxiosRequestHeaders = {
        Accept: 'application/json'
    }
    try {
        let token  = process.env.API_MAP_KEY as string;
        let promiseList =  await Promise.allSettled(trafficData.map(async (image: TraffiImage)=> {
            const x = await gettingNameAPICall(image, token);
            return x;
        }))
        let newList : TraffiImage[] = promiseList.map((x) => {
            if (x.status === 'fulfilled')
                return x.value;
        }) as unknown as TraffiImage[];
        console.log(newList.length);
        return newList;

    }catch(e) {
        console.log(e)
        console.log('no key');
    }
 
}

const gettingNameAPICall = async(image: TraffiImage, token: string)=> {
    const {Latitude, Longitude} = image
    let url =`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${Latitude},${Longitude}&token=${token}&buffer=20&addressType=ALL`
        const {data} = await axios.get(url);
        for(const location of data.GeocodeInfo) {
            if(location.ROAD !== undefined) {
                image["Name"] = location.ROAD;
                break;
            }
        }
        if(image["Name"] === undefined) image["Name"] = "Unknown"
        image["Location"] = {
            type: 'Point',
            coordinates: [Longitude,Latitude] as Types.Array<number>
        }
    return image;
}



