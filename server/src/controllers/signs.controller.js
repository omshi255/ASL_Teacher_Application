import { aslSigns } from "../data/aslSigns.js";

export const getAllSigns = (req, res) => {
  return res.json({
    success: true,
    total: aslSigns.length,
    data: aslSigns,
  });
};
