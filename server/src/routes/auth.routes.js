import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  changePassword,
  deleteProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);
router.delete("/delete-profile", protect, deleteProfile);

export default router;
