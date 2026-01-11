import { pool } from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = generateToken({ id: user.id });

    /* 🖥️ PRODUCTION LOG */
    console.log(`[AUTH] User registered | id=${user.id} | email=${user.email}`);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
      },
      token,
    });
  } catch (error) {
    console.error("[AUTH] Signup error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email=$1",
      [email]
    );

    if (!result.rows.length) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken({ id: user.id });

    /* 🖥️ PRODUCTION LOG */
    console.log(`[AUTH] User logged in | id=${user.id} | email=${user.email}`);

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("[AUTH] Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  console.log("[AUTH] User logged out");

  return res.json({
    success: true,
    message: "Logout successful",
  });
};

// get me
export const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id=$1",
      [req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("[AUTH] /me error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

/* ================= CHANGE PASSWORD ================= */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current & new password required",
      });
    }

    // get user with password
    const result = await pool.query(
      "SELECT id, password FROM users WHERE id=$1",
      [req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result.rows[0];

    // compare old password
    const isMatch = await comparePassword(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // hash new password
    const hashedPassword = await hashPassword(newPassword);

    await pool.query("UPDATE users SET password=$1 WHERE id=$2", [
      hashedPassword,
      user.id,
    ]);

    /* 🖥️ PRODUCTION LOG */
    console.log(`[AUTH] Password changed | id=${user.id}`);

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("[AUTH] Change password error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

/* ================= DELETE PROFILE ================= */
export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Optional: check user exists
    const check = await pool.query("SELECT id FROM users WHERE id=$1", [
      userId,
    ]);

    if (!check.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete user
    await pool.query("DELETE FROM users WHERE id=$1", [userId]);

    /* 🖥️ PRODUCTION LOG */
    console.log(`[AUTH] User deleted | id=${userId}`);

    return res.json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("[AUTH] Delete profile error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete profile",
    });
  }
};
