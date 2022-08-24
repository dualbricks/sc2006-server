import { Types } from "mongoose";

export interface carParkListLTA {
    value: carParkInfoLTA[]
}

export interface carParkInfoLTA {
    CarParkID: string,
    Area: string,
    Development: string,
    Location: string | dbGeolocationType,
    AvailableLots: lotType[] | number,
    LotType: string,
    Agency: string
}

export interface dbGeolocationType {
    type: "Point",
    coordinates: number[]
}
export interface lotType {
    lotType: string,
    AvailableLots: number
}

export interface carParkObject {
    [key:string] : carParkInfoLTA
}