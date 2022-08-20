import mongoose, {Schema, model} from "mongoose";
import validator from 'validator';
import { carParkInfoLTA } from "../../interfaces/index";

const carListSchema : Schema<carParkInfoLTA> = new mongoose.Schema<carParkInfoLTA>({
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