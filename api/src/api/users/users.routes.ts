import express from "express";

import { GetUserById, GetUserByEmail } from "./users.controllers";

const router = express.Router();

const idRegex =
  "[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}";
const emailRegex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}";

router.get(`/:id(${idRegex})`, GetUserById);
router.get(`/:email(${emailRegex})`, GetUserByEmail);

export default router;
