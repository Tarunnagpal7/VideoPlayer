import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try{ 
      const conectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log(`\n MongoDB connected || DB host : ${conectionInstance.connection.host} `);
    //   console.log(conectionInstance)

    }catch(error){
        console.log(" MongoDB Connection Failed :", error);
        process.exit(1);

    }
}

export default connectDB;