import express from "express";

import { CreateComment, UpdateComment, DeleteComment, GetComment } from "./comment.controllers";

const router = express.Router();

router.post("/", CreateComment);
router.get("/:id", GetComment);
router.put("/:id", UpdateComment);
router.delete("/:id", DeleteComment);

export default router;
