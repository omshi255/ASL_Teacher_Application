import useTestHistory from "../components/hooks/useTestHistory";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPage = () => {
  const { history, loading, error } = useTestHistory();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading analytics…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-3xl bg-white/40 backdrop-blur-lg p-10 text-center text-gray-600">
          <h2 className="text-xl font-semibold">No Analytics Yet</h2>
          <p className="mt-2 text-sm">
            Complete a test to see performance analytics.
          </p>
        </div>
      </div>
    );
  }

  /* ================= CHART DATA ================= */

  const attemptChartData = history.map((h, index) => ({
    attempt: index + 1,
    score: h.score_percentage,
    correct: h.correct_answers,
    incorrect: h.total_questions - h.correct_answers,
    date: new Date(h.created_at).toLocaleDateString(),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-indigo-600">
            Performance Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Visual insights into your test attempts and accuracy trends
          </p>
        </div>

        {/* SCORE TREND LINE CHART */}
        <div className="rounded-3xl bg-white shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Accuracy Trend (Per Attempt)
          </h2>

          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attemptChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CORRECT VS INCORRECT BAR CHART */}
        <div className="rounded-3xl bg-white shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Correct vs Incorrect Answers
          </h2>

          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attemptChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="correct" fill="#22c55e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="incorrect" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ATTEMPT FREQUENCY CHART */}
        <div className="rounded-3xl bg-white shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Attempts Timeline
          </h2>

          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attemptChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attempt"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
