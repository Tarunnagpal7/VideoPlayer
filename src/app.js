import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
//basic settings
app.use(express.json({limit:"16kb"})); //setting for making middleware to expect the json file upto limit 16kb
app.use(express.urlencoded({extended:true,limit:"16kb"})); // same for url , () extended is optional
app.use(express.static("public")); //saving pdf , img in public folder in my server
app.use(cookieParser()) //cookies use for crud operations by server  (secure cookies)

//import routes
import userRouter from "./routes/user.routes.js"
//routes declaration
app.use("/api/v1/users",userRouter)
// http://localhost:8000/api/v1/user/register

export {app};