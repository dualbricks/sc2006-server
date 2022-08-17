import axios from 'axios';
import { error } from 'console';

//  real time update of carpark availbility
const updateCarParkAvailbility = async (time: string) => {
    
    try {
        const {data, status} = await axios.get(`https://api.data.gov.sg/v1/transport/carpark-availability?date_time=${encodeURIComponent(time)}`,
            {
                headers:
                {
                    Accept: "application/json",
                }
            }
        );
        return data;
    }catch(e: any) {
        console.log(e);
    };
}

const getHDBCarParkData = async () => {
    // to be added
}


