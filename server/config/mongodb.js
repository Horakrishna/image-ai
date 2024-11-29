import mongoose from "mongoose";
const connectDB =async() =>{
    // Connection event
    mongoose.connection.on("connected", ()=>{
        console.log("Database Connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/Image-ai`)


}

export default connectDB;