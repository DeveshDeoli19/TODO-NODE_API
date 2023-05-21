import jwt from "jsonwebtoken";
import { user } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies; //because of cookie-parser

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Please login",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode the token
  req.user = await user.findById(decoded._id); //find user by decoded ID, and save all data to req.user
  next();
};
