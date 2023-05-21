import { user } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

//REGISTER A NEW USER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  //find user
  let usr = await user.findOne({ email });

  //if user exist throw error
    if(usr) return next(new Error("ERROR OCCURED"))

  const hashedPassword = await bcrypt.hash(password, 10);

  const uid = await user.create({ name, email, password: hashedPassword });

  sendCookie(uid, res, "Created user", 201);
};

//LOGIN AN EXISTING USER
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const usr = await user.findOne({ email }).select("+password");

  if(!usr) return next(new Error("ERROR OCCURED"))

  const isMatch = await bcrypt.compare(password, usr.password);

  if(!isMatch) return next(new Error("ERROR OCCURED"))

  sendCookie(usr, res, `Welcome back, ${usr.name}`, 200);
};

export const getMyProfile =(req, res) => {
  //only if logged in
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

/* Routes are only 3 so we are checking again and again is user is authenticated, so to reduce DRY we create middleware inwhich we have a function isAuthenticated which is called before the actual route function*/

export const logout = (req,res)=>{
  //just destroy the cookie
  res.status(200).cookie("token","",{
     expires: new Date (Date.now()),
    sameSite: process.env.NODE_ENV === "Development"?"lax": "none",
  secure:process.env.NODE_ENV === "Development"? false: true
})
  .json({
    success: true,
    user: req.user,
    
  });

}