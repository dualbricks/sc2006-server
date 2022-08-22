import axios,{AxiosRequestHeaders} from 'axios';
import { Types } from 'mongoose';
import { carParkInfoLTA, carParkListLTA, dbGeolocationType } from '../interfaces';
import { CarPark } from '../db/models/car';

//Function to update Carpark Availbility
const updateCarParkAvailbilityLTA = async(): Promise<void> => {
    try{
        await CarPark.collection.drop()
        await CarPark.ensureIndexes();
        await insertCarParkAvailbilityLTA();
    }catch(e) {
        console.log(e)
    }
}

// Inserting CarParks into db(run one time only)
const insertCarParkAvailbilityLTA = async (query?:string): Promise<void> => {
    const queryList: number[] = [0,500,1000,1500,2000];
    let config: AxiosRequestHeaders = {
        accept: 'application/json',
        AccountKey: process.env.API_KEY
    }
    let carParkList : carParkListLTA = {value: []};
    
    if(query === undefined) {
        
        try {
            //Running API calls in parallel
            await Promise.all(
                queryList.map(async query =>{
                    const data = await getCarParkInfo(query,config);
                    if(data) carParkList.value.push(...data);
                })
            )
            await pushCarParkInfo(carParkList);

        }catch(e) {
            console.log(e);
        }

    }
}
// API call to get data from LTA
const getCarParkInfo = async (query:number, config: AxiosRequestHeaders) : Promise<carParkInfoLTA[]| void> => {
    let url = `http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=${query}`
    try{
        const {data, status} = await axios.get(url, {headers: config});
        if(status === 200) return data.value;

    }catch(e) {
        console.log(e)
    }
    return
}
const pushCarParkInfo = async(data: carParkListLTA) : Promise<void>=> {
    data.value.forEach(carpark => {
        if(typeof carpark.Location === 'string') {
            let coordinates: number[] = convertStringToGeolocation(carpark.Location)
            carpark.Location = {
                type: 'Point',
                coordinates: coordinates
            }
        }
    });

    try {
        console.log(data.value)
        await CarPark.insertMany(data.value);
    }catch(e) {
        console.log(e)
    }
}

const convertStringToGeolocation = (s: string) : number[] => {
    var str_split :  number[] = s.split(" ").map(Number)
    return str_split.reverse()
}
//  real time update of carpark availbility (placeholder)
/* const updateCarParkAvailbility = async (time: string): Promise<CarParkList | string> => {
    let url =`https://api.data.gov.sg/v1/transport/carpark-availability?date_time=${encodeURIComponent(time)}`;
    let config : AxiosRequestHeaders  = {
        accept: 'application/json',
    }
    
    try {
        const {data, status} = await axios.get(url, config);
        if(status == 200) return data;
        else return "Try again later";
    }catch(e: any) {
        console.log(e);
        return "error"
    };

} */




export {
    //updateCarParkAvailbility,
    insertCarParkAvailbilityLTA,
    updateCarParkAvailbilityLTA
}

