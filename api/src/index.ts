import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import api from "api";
import errorHandler from "middlewares/error";

import type { Request, Response } from "express";

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

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
