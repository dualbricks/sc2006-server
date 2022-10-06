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