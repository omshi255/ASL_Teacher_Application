import useTestHistory from "../components/hooks/useTestHistory";

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
            Complete a test to see performance insights.
          </p>
        </div>
      </div>
    );
  }

  const totalAttempts = history.length;
  const average =
    history.reduce((sum, h) => sum + h.score_percentage, 0) / totalAttempts;

  const best = Math.max(...history.map((h) => h.score_percentage));
  const worst = Math.min(...history.map((h) => h.score_percentage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-indigo-600">
            Performance Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            A summary of your sign language test performance
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* AVG */}
          <div className="rounded-3xl bg-white shadow-md p-6">
            <p className="text-xs uppercase text-gray-500">Average Accuracy</p>
            <p className="mt-3 text-3xl font-bold text-indigo-600">
              {Math.round(average)}%
            </p>

            <div className="mt-4 w-full h-2 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${average}%` }}
              />
            </div>
          </div>

          {/* BEST */}
          <div className="rounded-3xl bg-white shadow-md p-6">
            <p className="text-xs uppercase text-gray-500">Best Score</p>
            <p className="mt-3 text-3xl font-bold text-green-600">{best}%</p>
          </div>

          {/* WORST */}
          <div className="rounded-3xl bg-white shadow-md p-6">
            <p className="text-xs uppercase text-gray-500">Lowest Score</p>
            <p className="mt-3 text-3xl font-bold text-red-500">{worst}%</p>
          </div>

          {/* ATTEMPTS */}
          <div className="rounded-3xl bg-white shadow-md p-6">
            <p className="text-xs uppercase text-gray-500">Total Attempts</p>
            <p className="mt-3 text-3xl font-bold text-gray-800">
              {totalAttempts}
            </p>
          </div>
        </div>

        {/* INSIGHTS */}
        <div className="rounded-3xl bg-white/60 backdrop-blur-lg p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Insights</h2>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              • Your average accuracy is{" "}
              <span className="font-semibold text-indigo-600">
                {Math.round(average)}%
              </span>
              .
            </li>

            <li>
              • Best performance recorded at{" "}
              <span className="font-semibold text-green-600">{best}%</span>.
            </li>

            <li>
              • Lowest score was{" "}
              <span className="font-semibold text-red-500">{worst}%</span>, keep
              practicing to improve consistency.
            </li>

            <li>
              • You have attempted{" "}
              <span className="font-semibold">{totalAttempts}</span> tests so
              far.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
