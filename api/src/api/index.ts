import express from "express";
import { isAuthenticated, RequestWithToken } from "middlewares/auth";
import authRoutes from "./auth/auth.routes";
import postRoutes from "./post/post.routes";
import commentRoutes from "./comment/comment.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

router.get("/test-protected", isAuthenticated, (req: RequestWithToken, res) => {
  res.json({ message: `Hello ${req.payload?.displayName}` });
});

export default router;
