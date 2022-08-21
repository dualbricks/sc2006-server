import mongoose, {Schema, model, Types} from "mongoose";
import validator from 'validator';
import { carParkInfo } from "../../interfaces/db/index";

const carListSchema : Schema<carParkInfo> = new mongoose.Schema<carParkInfo>({
    CarParkID: {
        type: String,
        required:true,
    },
    Area: {
        type: String
    },
    Development: {
        type: String,
        required:true
    },
    Location: {
        type: Object,
        coordinates: [Number],
        required:true,
        index: "2dsphere"
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