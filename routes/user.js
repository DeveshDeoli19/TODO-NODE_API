import express from "express";
import { register, login, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/me", isAuthenticated,getMyProfile);

router.get("/logout",logout);

export default router;

/* Routes are only 3 so we are checking again and again is user is authenticated, so to reduce DRY we create middleware inwhich we have a function isAuthenticated which is called before the actual route function where authentication is required first*/
