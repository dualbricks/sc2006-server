import axios, {AxiosRequestHeaders} from "axios";
import { Types } from "mongoose";
import { TrafficImageList } from "../db/models/trafficImage";

import {geoLocation, TrafficImageData, TraffiImage} from '../interfaces/db'
import { getAPIKey } from "../util/map/map";

let config: AxiosRequestHeaders = {
    accept: 'application/json',
    AccountKey: process.env.API_KEY
}


export const uploadTrafficImages = async (): Promise<void>=> {
    const data : TraffiImage[] = await requestTrafficImages();
    const updatedData  = await updateNameTrafficImage(data);
    try {
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
    let token  = await getAPIKey(process.env.MAP_EMAIL, process.env.MAP_PASSWORD) as string;


    let newList =  await Promise.all(trafficData.map(async (image: TraffiImage)=> {
        const x = await gettingNameAPICall(image, token);
        return x;
    }))
    console.log(newList.length)
    return newList;
}

const gettingNameAPICall = async(image: TraffiImage, token: string)=> {
    const {Latitude, Longitude} = image
    let url =`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${Latitude},${Longitude}&token=${token}&buffer=20&addressType=ALL`
        const {data} = await axios.get(url, {headers: config});
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



