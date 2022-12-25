import express from "express";
import {deletes, update,getAUser,dk,udk,like,disLike} from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

/// update
router.put("/:id",verifyToken ,update)

/// delete
router.delete("/:id",verifyToken,deletes)

///get a user
router.get("/find/:id",getAUser)

/// subscribe a user
router.put("/sub/:id" , verifyToken,dk)

/// unsubscribe a user
router.put("/unsub/:id", verifyToken,udk)

/// like a video 
router.put("/like/:videoId", verifyToken,like)

/// dislike a video
router.put("/dislike/:videoId", verifyToken, disLike)



export default router;