import mongoose from "mongoose";

export interface expenditureRecord {
    carParkID: string;
    startTime: Date;
    endTime: Date;
    cost: number;
    owner: mongoose.Schema.Types.ObjectId;
}