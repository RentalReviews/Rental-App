import express from "express";

import { CreateComment, GetComments, UpdateComment, DeleteComment } from "./comment.controllers";

const router = express.Router();

router.post("/createcomment", CreateComment);
router.post("/getcomments", GetComments);
router.post("/updatecomment", UpdateComment);
router.post("/deletecomment", DeleteComment);

export default router;
