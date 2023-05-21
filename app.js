import express from "express"
import cors from "cors"
import userRoutes from "./routes/user.js"
import taskRoutes from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
    path:"./data/config.env"
})

app.use(cors({
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.json()); //middleware
app.use(cookieParser());
app.use("/api/v1/users",userRoutes);//middleware because users is added in all routes
app.use("/api/v1/tasks",taskRoutes);

//error handler
app.use(errorMiddleware)

app.get("/",(req,res)=>{
    res.send("WELCOME")
})


