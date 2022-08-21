import mongoose, {Schema, model, Types} from "mongoose";
import validator from 'validator';
import { carParkInfo } from "../../interfaces/db/index";

const carListSchema : Schema<carParkInfo> = new mongoose.Schema<carParkInfo>({
    CarParkID: {
        type: String,
        required:true,
        unique: true,
    },
    Area: {
        type: String,
        required:true
    },
    Development: {
        type: String,
        required:true
    },
    Location: {
        type: String,
        coordinates: Types.Array<Number>,
        required:true
    },
    AvailableLots: {
        type: Number,
        required:true
    },
    LotType: {
        type: String,
        required:true
    },
    Agency: {
        type: String,
        required:true
    }
}, {
    timestamps: true
})

const CarPark = mongoose.model("CarPark", carListSchema)

export {CarPark}