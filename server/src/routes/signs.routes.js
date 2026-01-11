import express from "express";
import { getAllSigns } from "../controllers/signs.controller.js";

const router = express.Router();

router.get("/", getAllSigns);

export default router;
