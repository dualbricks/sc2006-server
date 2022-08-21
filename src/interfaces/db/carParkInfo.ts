import { Types } from "mongoose";
import { carParkInfoLTA } from "../carParkLta";
export interface geoLocation {
    latt: number,
    long: number
}
export interface carParkInfo extends carParkInfoLTA {
    Location: {
        type: "Point";
        coordinates: Types.Array<number>
    }
}