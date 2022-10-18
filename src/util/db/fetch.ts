import mongoose from "mongoose";
import { CarPark } from "../../db/models/car";
import axios, {} from "axios";

export const fetchNearByCarParks = async (latt : number, long: number )=> {
    try {
        const data = await CarPark.find({Location: {$nearSphere: {$geometry: {type: "Point",coordinates:[long, latt]}, $maxDistance:2000}}})
        return data
       
    }catch(e) {
        throw new Error("Not available at the moment.");
    }
    
}

export const fetchCarParks = async() =>{
    try {
        const data = await CarPark.find();
        return data;
    }catch(e) {
        throw new Error("Not available at the moment.");
    }

}