import mongoose, {Schema, model, Types} from "mongoose";
import validator from 'validator';
import { AvailabilityLog } from "../../interfaces";
import { Logger } from "../Logger";

const availabilityLogSchema : Schema<AvailabilityLog> = new mongoose.Schema<AvailabilityLog>({
    CarParkID: {
        type: String,
        required: true
    },
    AvailableLots: {
        type:[Object],
        required: true
    },
    Minute: {
        type: Number,
        required: true
    },
    Hour: {
        type: Number,
        required: true
    },
    Day: {
        type: Number,
        required: true
    },

})

const AvailabilityLogdb = Logger.model("AvailabilityLog", availabilityLogSchema)

export {AvailabilityLogdb}