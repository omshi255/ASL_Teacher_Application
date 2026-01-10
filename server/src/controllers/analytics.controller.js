// import { pool } from "../config/db.js";

// /**
//  * GET /api/analytics/overview
//  * Protected
//  */
// export const getAnalyticsOverview = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const result = await pool.query(
//       `
//       SELECT
//         COUNT(*)::int AS total_tests,
//         AVG(score_percentage)::int AS average_score,
//         MAX(score_percentage)::int AS best_score
//       FROM test_results
//       WHERE user_id = $1
//       `,
//       [userId]
//     );

//     const stats = result.rows[0];

//     return res.json({
//       success: true,
//       analytics: {
//         totalTests: stats.total_tests || 0,
//         averageScore: stats.average_score || 0,
//         bestScore: stats.best_score || 0,
//       },
//     });
//   } catch (error) {
//     console.error("[ANALYTICS] overview error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch analytics",
//     });
//   }
// };

// /**
//  * GET /api/analytics/history
//  * Protected
//  */

// export const getScoreHistory = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const result = await pool.query(
//       `
//       SELECT
//         id,
//         total_questions,
//         correct_answers,
//         score_percentage,
//         created_at
//       FROM test_results
//       WHERE user_id = $1
//       ORDER BY created_at DESC
//       `,
//       [userId]
//     );

//     return res.json({
//       success: true,
//       totalAttempts: result.rows.length,
//       history: result.rows
//     });
//   } catch (error) {
//     console.error("[HISTORY] error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch user history"
//     });
//   }
// };
import { pool } from "../config/db.js";

export const getAnalyticsOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        COUNT(*)::int AS total_tests,
        COALESCE(AVG(score_percentage), 0)::int AS average_score,
        COALESCE(MAX(score_percentage), 0)::int AS best_score
      FROM test_attempts
      WHERE user_id = $1
      `,
      [userId]
    );

    return res.status(200).json({
      success: true,
      overview: result.rows[0],
    });
  } catch (error) {
    console.error("[ANALYTICS OVERVIEW] error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics overview",
    });
  }
};

export const getScoreHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        id,
        score_percentage,
        total_questions,
        correct_answers,
        created_at
      FROM test_attempts
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return res.status(200).json({
      success: true,
      history: result.rows,
    });
  } catch (error) {
    console.error("[HISTORY] error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};
