import express from "express";
import { isAuthenticated, RequestWithToken } from "middlewares/auth";
import authRoutes from "./auth/auth.routes";
import postRoutes from "./post/post.routes";
import commentRoutes from "./comment/comment.routes";
import userRoutes from "./users/users.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/postings", postRoutes);
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);

router.get("/test-protected", isAuthenticated, (req: RequestWithToken, res) => {
  res.json({ message: `Hello ${req.payload?.displayName}` });
});

export default router;
