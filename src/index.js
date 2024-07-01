import dotenv  from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path : './env'
})

 
connectDB()
.then(()=>{
    app.on("error",(error)=>{  //express error occur
         console.log("Error after connection mongoDB : ", error )
         throw error;
    })

    app.listen(process.env.PORT || 5000 , ()=>{
        console.log(`server is running at Port  : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection Failed : ", err);
})



// //Connection Type
// ;(async()=>{
//     try{
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//       app.on("error",(error)=>{ //this is from express.
//         console.log("Error after connetion mongoDB :" ,error);
//         throw error;
//       })
    //  app.listen(process.env.PORT,()=>{
    //     console,log(`App is listning on post ${process.env.PORT}`);
    //  })
//     }catch(error){
//         console.log("Failed to Connet : ", error);
//         throw error;
//     }
// })()