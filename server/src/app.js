import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import signsRoutes from "./routes/signs.routes.js";
import testRoutes from "./routes/test.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/signs", signsRoutes);
app.use("/api/test", testRoutes);
app.use("/api/analytics", analyticsRoutes);

export default app;
