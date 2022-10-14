import mongoose from "mongoose";

const uri = encodeURI(`mongodb+srv://dualbricks:${process.env.MONGODB_PW}@task.wajvu.mongodb.net/?retryWrites=true&w=majority`)
mongoose.connect(uri, {})
