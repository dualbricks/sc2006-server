import mongoose from "mongoose";

const uri = `mongodb+srv://dualbricks:${encodeURI(process.env.MONGODB_PW)}@task.wajvu.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri, {
})
