import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import clientRoute from "./router/clientRoute.js";
import cookieParser from "cookie-parser";
const app=express();
app.use(bodyParser.json({limit:"50mb"}));
app.use(cookieParser());
app.use(cors());
app.use("/api",clientRoute);
app.use("/",(req,res)=>{
    res.status(200).json({
        data:"Server is Running"
    })
})
export default app;