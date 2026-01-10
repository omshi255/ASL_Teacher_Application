import { pool } from "../config/db.js";

export const submitTest = async (req, res) => {
  try {
    const { totalQuestions, correctAnswers, signResults } = req.body;
    const userId = req.user.id; // UUID

    if (
      typeof totalQuestions !== "number" ||
      typeof correctAnswers !== "number" ||
      !Array.isArray(signResults)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid test data",
      });
    }

    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    // 1️⃣ Insert test attempt
    const attemptRes = await pool.query(
      `
      INSERT INTO test_attempts
      (user_id, total_questions, correct_answers, score_percentage)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
      `,
      [userId, totalQuestions, correctAnswers, scorePercentage]
    );

    const attemptId = attemptRes.rows[0].id;

    // 2️⃣ Insert per-sign results
    for (const s of signResults) {
      await pool.query(
        `
        INSERT INTO test_sign_results
        (attempt_id, sign_name, is_correct)
        VALUES ($1, $2, $3)
        `,
        [attemptId, s.sign, s.isCorrect]
      );
    }

    return res.status(201).json({
      success: true,
      message: "Test submitted successfully",
      result: {
        attemptId,
        scorePercentage,
        createdAt: attemptRes.rows[0].created_at,
      },
    });
  } catch (error) {
    console.error("[TEST] submit error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit test",
    });
  }
};
