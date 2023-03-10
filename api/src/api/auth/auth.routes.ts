import express from "express";

import { login, refreshToken, register } from "./auth.controllers";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", refreshToken);

export default router;
