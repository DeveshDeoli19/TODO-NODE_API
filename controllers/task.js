import { task} from "../models/task.js"

export const newTask=async(req,res,next)=>{


    const { title, description}= req.body;
    //call isAuthenticated first to access user details
    await task.create({ title, description, user: req.user });

    res.status(201).json({
        success:true,
        message:"Task added Successfully"
    })


}

export const myTask=async(req,res)=>{

    const userid = req.user._id

    const tasks = await task.find({ user:userid});

    res.status(200).json({
        success:true,
        tasks,
    })

}

export const updateTask=async(req,res,next)=>{

    

    const tasks = await task.findById(req.params.id);

    if(!tasks) return next(new Error("ERROR OCCURED"))

    tasks.isCompleted = !tasks.isCompleted;

    await tasks.save();
    res.status(200).json({
        success:true,
        message:"task updated successfully"
    })

}

export const deleteTask=async(req,res,next)=>{

    const tasks = await task.findById(req.params.id);

    if(!task) return next(new Error ("ERROR OCCURED"))

    await tasks.deleteOne();
    res.status(200).json({
        success:true,
        message:"Task deleted"
    })

}