import express from "express";
import {
  getAnalyticsOverview,
  getScoreHistory,
} from "../controllers/analytics.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * GET /api/analytics/overview
 */
router.get("/overview", protect, getAnalyticsOverview);

/**
 * GET /api/analytics/history
 */
router.get("/history", protect, getScoreHistory);

export default router;
