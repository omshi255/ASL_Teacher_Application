export const submitTestResult = async ({ score, total }) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/test/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      totalQuestions: total, // ✅ backend expects this
      correctAnswers: score, // ✅ backend expects this
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Test submit failed");
  }

  return data;
};
const API_URL = import.meta.env.VITE_API_URL;

export const fetchTestHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/analytics/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "History failed");

  return data.history; // backend sends `history`
};
