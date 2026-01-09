import { pool } from "../config/db.js";

/**
 * POST /api/test/submit
 * Body:
 * {
 *   totalQuestions: 10,
 *   correctAnswers: 7
 * }
 */
export const submitTest = async (req, res) => {
  try {
    const { totalQuestions, correctAnswers } = req.body;

    if (
      typeof totalQuestions !== "number" ||
      typeof correctAnswers !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid test data",
      });
    }

    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    const result = await pool.query(
      `INSERT INTO test_results
       (user_id, total_questions, correct_answers, score_percentage)
       VALUES ($1, $2, $3, $4)
       RETURNING id, score_percentage, created_at`,
      [req.user.id, totalQuestions, correctAnswers, scorePercentage]
    );

    console.log(`[TEST] User ${req.user.id} scored ${scorePercentage}%`);

    return res.status(201).json({
      success: true,
      message: "Test submitted successfully",
      result: result.rows[0],
    });
  } catch (error) {
    console.error("[TEST] submit error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to submit test",
    });
  }
};
