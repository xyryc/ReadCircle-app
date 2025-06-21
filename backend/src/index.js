import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import job from "./lib/cron.js";

const app = express();
const PORT = process.env.PORT || 3000;

job.start();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Read Circle server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
