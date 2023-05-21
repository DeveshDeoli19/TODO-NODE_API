import { connectDB } from "./data/database.js";
import { app } from "./app.js";

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on: ${process.env.PORT} Port in ${process.env.NODE_ENV} mode`)
})