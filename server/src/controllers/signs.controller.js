import {pool} from "../config/db.js";

export const getAllSigns = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        description,
        difficulty,
        reference_image AS "referenceImage",
        reference_url AS "referenceUrl",
        steps
      FROM asl_signs
      ORDER BY created_at ASC
    `);

    res.status(200).json({
      success: true,
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching signs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch signs",
    });
  }
};
