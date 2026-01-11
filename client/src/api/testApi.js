// client/src/api/testApi.js

const API_URL = import.meta.env.VITE_API_URL;

// ✅ TEST SUBMIT (already working)
export const submitTestResult = async ({
  correctAnswers,
  totalQuestions,
  signResults,
}) => {
  const res = await fetch(`${API_URL}/api/test/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      correctAnswers,
      totalQuestions,
      signResults, // 🔥 THIS WAS MISSING
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// ✅ HISTORY FETCH (THIS WAS MISSING ❌)
export const fetchTestHistory = async () => {
  const res = await fetch(`${API_URL}/api/analytics/history`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.history; // 👈 important
};

// ✅ ANALYTICS FETCH (optional but recommended)
export const fetchAnalytics = async () => {
  const res = await fetch(`${API_URL}/api/analytics/overview`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
