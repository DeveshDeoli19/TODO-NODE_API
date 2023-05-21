import mongoose from "mongoose"


export const connectDB= ()=>{
    mongoose.connect(process.env.MONGO_URI,{
    dbname: "backendAPI"
})
.then(()=>{
    console.log("Conneccted to DB")
})
.catch(()=>{
    console.log("Error")
})}