import express from "express";
import {addVideo, updateVideo ,getVideo ,deleteVideo, viewVideo, trendVideo, randomVideo,subVideo,getByChannel ,getByTag, searchVideo} from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";


const router = express.Router();
// add a video
router.post("/video/",verifyToken,addVideo)

/// delete a video
router.delete("/video/:id",verifyToken,deleteVideo)

//update a video
router.put("/video/:id",verifyToken,updateVideo)

//get a video
router.get("/video/find/:id" ,getVideo)

// up views a video
router.put("/video/view/:id" ,viewVideo)

// get trending videos
router.get("/video/trend/" ,trendVideo)

//get random videos
router.get("/video/random/" ,randomVideo)

//get channel you subscribe
router.get("/video/sub",verifyToken,subVideo)

// find videos by tags
router.get("/video/tags",getByTag)

// search videos
router.get("/video/search",searchVideo)
/// get all video Channel 
router.get("/video/:id", getByChannel)

export default router;