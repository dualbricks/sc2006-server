import { Types } from "mongoose";
import { TrafficImageList } from "../../db/models/trafficImage";

export interface TraffiImage  {
    CameraID: string,
    Latitude: number,
    Longitude: number,
    ImageLink: string,
    Name: string,
    Location: {
        type: "Point";
        coordinates: Types.Array<number>
    }
}


export interface TrafficImageData {
    value : TraffiImage[]
}