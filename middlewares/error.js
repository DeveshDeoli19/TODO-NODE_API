export const errorMiddleware= (err,req,res,next)=>{
    return res.status(404).json({
         success:false,
         message:"Task does not exist"
     })
    }