import express from "express";
import { isAuthenticated } from "middlewares/auth";

import { CreateComment, UpdateComment, DeleteComment, GetComment } from "./comment.controllers";

const router = express.Router();

router.post("/", isAuthenticated, CreateComment);
router.get("/:id", GetComment);
router.put("/:id", isAuthenticated, UpdateComment);
router.delete("/:id", isAuthenticated, DeleteComment);

export default router;
