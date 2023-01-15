import express from "express";
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend,updateVideo,deleteVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
// update a videos
router.put("/:id", verifyToken, updateVideo)
// delete a videos
router.delete("/:id", verifyToken, deleteVideo)
// find By Id a videos
router.get("/find/:id", getVideo)
// View Videos
router.put("/view/:id", addView)
// Get Videos By Trends
router.get("/trend", trend)
// Random
router.get("/random", random)
// Get the Sub
router.get("/sub",verifyToken, sub)
// Get the Tages
router.get("/tags", getByTag)
// Search Videos
router.get("/search", search)

export default router;