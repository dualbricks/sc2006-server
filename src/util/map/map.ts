import axios, {AxiosRequestHeaders} from "axios";
import { geoLocation } from "../../interfaces/db";


const getGeolocation = async (query:string): Promise<geoLocation|void> =>{
    let config : AxiosRequestHeaders = {
        Accept: 'application/json'
    }
    let url = `https://developers.onemap.sg/commonapi/search?searchVal=${query}road&returnGeom=Y&getAddrDetails=N&pageNum=1`
    const data = await axios.get(url, {headers:config});
    console.log(data);
}

