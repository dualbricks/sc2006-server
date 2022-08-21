import axios,{AxiosRequestHeaders} from 'axios';
import { carParkInfoLTA, carParkListLTA } from '../interfaces';

// API call for carpark availability from Datamall LTA
const updateCarParkAvailbilityLTA = async (query?:string): Promise<void> => {
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
                    if(data) carParkList.value.push(data);
                })
            )
        }catch(e) {
            console.log(e);
        }

    }
}
const getCarParkInfo = async (query:number, config: AxiosRequestHeaders) : Promise<carParkInfoLTA| void> => {
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
        
        
    });

}

const convertStringToGeolocation = async(s: string) => {
    


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
    updateCarParkAvailbilityLTA
}

