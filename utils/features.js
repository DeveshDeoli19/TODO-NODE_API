import jwt from "jsonwebtoken"
export const sendCookie = ( uid, res,message,statusCode=200)=>{ 
    
    const token = jwt.sign({ _id: uid._id}, process.env.JWT_SECRET)

// automatically login as soon as registered we use cookie
res
.status(statusCode)
.cookie("token", token, {

  httpOnly: true,
  maxAge: 15 * 60 * 1000, //15min
  sameSite: process.env.NODE_ENV === "Development"?"lax": "none",
  secure:process.env.NODE_ENV === "Development"? false: true
} ).json({

  success:true,
  message:message,
})
}