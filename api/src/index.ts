import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import api from "api";

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/v1", api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
