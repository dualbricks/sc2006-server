import mongoose from "mongoose";
import { CarPark } from "../../db/models/car";
import axios, {} from "axios";

export const fetchNearByCarParks = async (latt : number, long: number )=> {
    const data = await CarPark.find({Location: {$nearSphere: {$geometry: {type: "Point",coordinates:[long, latt]}, $maxDistance:2000}}})
    return data
}