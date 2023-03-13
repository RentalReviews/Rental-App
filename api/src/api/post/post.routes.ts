import express from "express";

import { CreatePost, GetPosts, GetPhotos, UpdatePost, DeletePost } from "./post.controllers";

const router = express.Router();

router.post("/createpost", CreatePost);
router.get("/getposts", GetPosts);
router.post("/getphotos", GetPhotos);
router.post("/updatepost", UpdatePost);
router.post("/deletepost", DeletePost);

export default router;
