import mongoose, {Schema, model, Types} from "mongoose";
import { expenditureRecord } from "../../interfaces/db/expenditureRecord";
import { TraffiImage } from "../../interfaces/db/index";

const expenditureLogSchema : Schema<expenditureRecord> = new mongoose.Schema<expenditureRecord>({
    carParkID: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true
})

const ExpenditureLog = mongoose.model("expenditure", expenditureLogSchema)

export {ExpenditureLog}