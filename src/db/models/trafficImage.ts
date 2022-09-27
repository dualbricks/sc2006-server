import mongoose, {Schema, model, Types} from "mongoose";
import { TraffiImage } from "../../interfaces/db/index";

const trafficImageSchema : Schema<TraffiImage> = new mongoose.Schema<TraffiImage>({
    CameraID:{
        type: String,
        required: true
    },
    Latitude: {
        type: Number,
        required: true
    },
    Longitude: {
        type: Number,
        required: true
    },
    ImageLink: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Location: {
        type: Object,
        coordinates: [Number],
        required:true,
        index: "2dsphere"
    }
}, {
    timestamps: true
})

const TrafficImageList = mongoose.model("TrafficImage", trafficImageSchema)

export {TrafficImageList}