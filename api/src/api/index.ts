import express from "express";
import { isAuthenticated, RequestWithToken } from "middlewares/auth";
import authRoutes from "./auth/auth.routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.get("/test-protected", isAuthenticated, (req: RequestWithToken, res) => {
  res.json({ message: `Hello ${req.payload?.displayName}` });
});

export default router;
