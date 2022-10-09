import axios,{AxiosRequestHeaders} from 'axios';
import { Types } from 'mongoose';
import { carParkInfoLTA, carParkListLTA, dbGeolocationType, carParkObject, lotType } from '../interfaces';
import { CarPark } from '../db/models/car';
import * as schedule from 'node-schedule'


const CarParkAvailabilityScheduler = async (): Promise<void>=> {
    var rule = new schedule.RecurrenceRule();
    
    rule.minute = [new schedule.Range(0,59, 1)];

    schedule.scheduleJob(rule, async ()=> {
        try{
            await updateCarParkAvailbilityLTA();
        }catch(e) {
            console.log(e);
        }
    })
} 
//Function to update Carpark Availbility
const updateCarParkAvailbilityLTA = async(): Promise<void> => {
    try{
        const data : void | carParkInfoLTA[] = await getCarParkAvailbilityLTA();
        const start = Date.now()
        if(data) {
            await CarPark.collection.drop()
            await CarPark.ensureIndexes();
            await CarPark.insertMany(data);
        }
        const end = Date.now()-start
        console.log(`time taken for DB operation: ${end} milliseconds`)

    }catch(e) {
        console.log(e)
    }
}

// Inserting CarParks into db(run one time only)
const getCarParkAvailbilityLTA = async (query?:string): Promise<void|carParkInfoLTA[]> => {
    const queryList: number[] = [0,500,1000,1500,2000];
    let config: AxiosRequestHeaders = {
        accept: 'application/json',
        AccountKey: encodeURI(process.env.API_KEY)
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
            const data : carParkInfoLTA[] | void = await pushCarParkInfo(carParkList);
            if(data) return  data

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
const pushCarParkInfo = async(data: carParkListLTA) : Promise<void | carParkInfoLTA[]>=> {
    try {
        let newData : carParkInfoLTA[] = mergeCarParkInfo(data.value)
        return newData
    }catch(e) {
        console.log(e)
    }
}

const convertStringToGeolocation = (s: string) : number[] => {
    var str_split :  number[] = s.split(" ").map(Number)
    return str_split.reverse()
}
export const mergeCarParkInfo = (data: carParkInfoLTA[]) : carParkInfoLTA[] =>{
    type lot = lotType[]
    //data.sort((a,b)=>compareString(a,b));
    let carParkObj : carParkObject = {}
    const start = Date.now();
    data.forEach((carPark: carParkInfoLTA)=>{
        if(carParkObj[carPark.CarParkID]) {
            let lotArr: lot = carParkObj[carPark.CarParkID].AvailableLots as lot
            lotArr.push({lotType:carPark.LotType, AvailableLots: carPark.AvailableLots as number})
            carParkObj[carPark.CarParkID].AvailableLots = lotArr;
        }
        else {
            carParkObj[carPark.CarParkID] = {...carPark};
            carParkObj[carPark.CarParkID].AvailableLots = <lot> [{ lotType: carPark.LotType, AvailableLots: carPark.AvailableLots}]
            if(typeof carPark.Location === 'string') {
                let coordinates: number[] = convertStringToGeolocation(carPark.Location)
                carParkObj[carPark.CarParkID].Location = {
                    type: 'Point',
                    coordinates: coordinates
                }
            }
        }
    })
    const end = Date.now() - start
    console.log(`Time taken for merging: ${end} milliseconds`)
    const newData : carParkInfoLTA[] = Object.values(carParkObj);
    return newData
}

const compareString = (a:carParkInfoLTA,b:carParkInfoLTA) => {
    let fa = a.CarParkID.toLowerCase(),
    fb = b.CarParkID.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
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
    getCarParkAvailbilityLTA,
    updateCarParkAvailbilityLTA,
    CarParkAvailabilityScheduler

}

