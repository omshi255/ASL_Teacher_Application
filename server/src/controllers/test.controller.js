import { pool } from "../config/db.js";

export const submitTest = async (req, res) => {
  const client = await pool.connect();

  try {
    const { totalQuestions, correctAnswers, signResults } = req.body;
    const userId = req.user.id;

    // validation
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

    await client.query("BEGIN");

    // 1️⃣ Insert test_attempt
    const attemptRes = await client.query(
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
      if (!s.sign || typeof s.isCorrect !== "boolean") continue;

      // ✅ FIX 1: case-insensitive + trimmed match
      const signRes = await client.query(
        `
        SELECT id
        FROM asl_signs
        WHERE LOWER(TRIM(name)) = LOWER(TRIM($1))
        `,
        [s.sign]
      );

      if (signRes.rows.length === 0) {
        console.log("SIGN NOT FOUND IN DB:", s.sign);
        continue;
      }

      const signId = signRes.rows[0].id;

      // ✅ FIX 2: UPSERT (no duplicates)
      await client.query(
        `
        INSERT INTO test_sign_results (attempt_id, sign_id, is_correct)
        VALUES ($1, $2, $3)
        ON CONFLICT (attempt_id, sign_id)
        DO UPDATE SET is_correct = EXCLUDED.is_correct
        `,
        [attemptId, signId, s.isCorrect]
      );
    }

    await client.query("COMMIT");

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
    await client.query("ROLLBACK");
    console.error("[TEST] submit error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit test",
    });
  } finally {
    client.release();
  }
};
