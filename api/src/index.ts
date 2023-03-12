import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

// async function main() {
//   const user = await prismaClient.post.findMany()
//   console.log(user);
// }
// main()
//   .catch(e=>{
//     console.log(e.message)
//   })

import api from "api";
import errorHandler from "middlewares/error";

import type { Request, Response } from "express";

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const IS_PROD = process.env.NODE_ENV === "production";

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is missing");
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is missing");
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan(IS_PROD ? "combined" : "dev"));

app.get("/", (_, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/v1", api);

app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
