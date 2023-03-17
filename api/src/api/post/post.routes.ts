import express from "express";
import { isAuthenticated } from "middlewares/auth";

import { CreatePost, GetPosts, GetPost, UpdatePost, DeletePost } from "./post.controllers";

const router = express.Router();

router.post("/", isAuthenticated, CreatePost);
router.get("/", GetPosts);
router.get("/:id", GetPost);
router.put("/:id", isAuthenticated, UpdatePost);
router.delete("/:id", isAuthenticated, DeletePost);

export default router;
