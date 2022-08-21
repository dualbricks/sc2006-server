import { Types } from "mongoose";

export interface carParkListLTA {
    value: carParkInfoLTA[]
}

export interface carParkInfoLTA {
    CarParkID: string,
    Area: string,
    Development: string,
    Location: string | dbGeolocationType,
    AvailableLots: number,
    LotType: string,
    Agency: string
}

export interface dbGeolocationType {
    type: "Point",
    coordinates: number[]
}