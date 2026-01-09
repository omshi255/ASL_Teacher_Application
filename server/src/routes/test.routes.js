import express from "express";
import { submitTest } from "../controllers/test.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * POST /api/test/submit
 * Protected
 */
router.post("/submit", protect, submitTest);

export default router;
