import axios, {AxiosRequestHeaders} from "axios";
import { geoLocation } from "../../interfaces/db";


export const getGeolocation = async (query:string): Promise<geoLocation|void> =>{
    let config : AxiosRequestHeaders = {
        Accept: 'application/json'
    }
    let url = `https://developers.onemap.sg/commonapi/search?searchVal=${query}&returnGeom=Y&getAddrDetails=N&pageNum=1`
    try{
        const data: any = await axios.get(url, {headers:config});
        if(data.data.found > 0) {
            const geo = {
                latt: Number(data.data.results[0].LATITUDE),
                long: Number(data.data.results[0].LONGITUDE)
            }
            return geo;
        }

    }catch(e) {
        console.log(e);
        throw new Error("Not available at the moment.");
    }

}

export const getAPIKey = async(email: String, password: String): Promise<String| void> => {

    let config : AxiosRequestHeaders = {
        Accept: 'application/json',
        'cache-control': 'no-cache, max-age=0',
    }
    let url = `https://developers.onemap.sg/privateapi/auth/post/getToken`
    try {
        const {data, status} = await axios.post(url, {Headers: config, email: email, password:password});
        const APIKey = data.access_token;
        return APIKey;
    } catch(e) {
        return ''
    }
}