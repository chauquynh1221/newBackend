import express from "express";
import {signin, signup, ggAuth} from "../controllers/auth.js"


const router = express.Router();

//// createrUser
router.post("/signup",signup)

/// sign in user
router.post("/signin",signin)

/// google authentication
router.post("/google", ggAuth)


export default router;