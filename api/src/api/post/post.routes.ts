import express from "express";

import { CreatePost, GetPosts, GetPost, UpdatePost, DeletePost } from "./post.controllers";

const router = express.Router();

router.post("/", CreatePost);
router.get("/", GetPosts);
router.get("/:id", GetPost);
router.put("/:id", UpdatePost);
router.delete("/:id", DeletePost);

export default router;
