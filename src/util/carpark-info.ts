import axios,{AxiosRequestHeaders} from 'axios';
import { DotenvConfigOutput } from 'dotenv';
import { CarParkList } from '../interfaces/carpark';
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

const getHDBCarParkData = async () => {
    // to be added
}


export {
    updateCarParkAvailbility
}

