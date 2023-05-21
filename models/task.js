import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    isCompleted:{
        type:Boolean,
        default: false
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,//get _id
        ref:"user", //collection name
        required:true
    },

    createdAt:{
        type: Date,
        default: Date.now,
    }
   
})

export const task = mongoose.model("task",schema);

