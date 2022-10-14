 import mongoose from "mongoose";

const uri2 = encodeURI(`mongodb+srv://DB1:${process.env.DB_PW}@cluster0.9uvlv4o.mongodb.net/?retryWrites=true&w=majority`)
console.log(uri2)
const Logger = mongoose.createConnection(uri2, {
 })

 export {Logger}
