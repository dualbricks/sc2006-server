import axios,{AxiosRequestHeaders} from 'axios';
import { CarParkList } from '../interfaces/carpark';
import { carParkInfoLTA, carParkListLTA } from '../interfaces';

// API call for carpark availability from Datamall LTA
const updateCarParkAvailbilityLTA = async (query?:string)  => {
    const queryList: number[] = [0,500,1000,1500,2000];
    let config: AxiosRequestHeaders = {
        accept: 'application/json',
        AccountKey: process.env.API_KEY
    }
    let carParkList : carParkListLTA = {value: []};
    
    if(query === undefined) {
        
        try {
            //Running API calls in parallel
            const responses = await Promise.all(
                queryList.map(async query =>{
                    let url = `http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=${query}`
                    const {data, status} = await axios.get(url, {headers: config});
                    if(status === 200) carParkList.value.push(data.value);
                })
            )
        }catch(e) {
            console.log(e);
        }
    }
}
//  real time update of carpark availbility
const updateCarParkAvailbility = async (time: string): Promise<CarParkList | string> => {
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

}




export {
    updateCarParkAvailbility,
    updateCarParkAvailbilityLTA
}

