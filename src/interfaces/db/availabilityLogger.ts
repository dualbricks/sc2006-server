import { lotType } from "../carParkLta";


export interface AvailabilityLog {
    CarParkID: String;
    AvailableLots: Array<lotType>;
    Minute: Number;
    Hour: Number;
    Day: Number;
}