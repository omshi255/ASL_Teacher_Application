import express from "express";
import { getAllSigns } from "../controllers/signs.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/", protect, getAllSigns);

export default router;
