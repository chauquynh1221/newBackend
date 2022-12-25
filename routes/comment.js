import express from "express";
import {addComment  , updateComment, deleteComment, getComments} from "../controllers/comment.js"
import { verifyToken} from "../verifyToken.js";

const router = express.Router();

// add a comment
router.post("/comment", verifyToken ,addComment)

// update a comment
router.put("/comment/:id", verifyToken,updateComment)

// delete a comment
router.delete("/comment/:id", verifyToken,deleteComment)

// get all comments  for a video 
router.get("/comment/:videoId",getComments)


export default router;