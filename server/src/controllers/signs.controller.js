import { pool } from "../config/db.js";

export const getAllSigns = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        description,
        reference_image
      FROM asl_signs
      ORDER BY id ASC
    `);

    return res.status(200).json({
      success: true,
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching signs:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch signs",
    });
  }
};
