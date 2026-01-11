import useTestHistory from "../components/hooks/useTestHistory";
import HistoryTable from "../history/HistoryTable";

const HistoryPage = () => {
  const { history, loading, error } = useTestHistory();

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50">
        <p className="text-gray-500 text-sm">Loading test history…</p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  /* ================= PAGE ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            History
          </p>

          <h1 className="text-3xl font-bold text-indigo-600 mt-1">
            Test History
          </h1>

          <p className="mt-2 text-gray-600 max-w-2xl">
            Review your previous test attempts and track your learning progress
            over time.
          </p>
        </div>

        {/* CONTENT CARD */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          {history.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">No test attempts yet</p>
              <p className="text-sm mt-1">
                Complete a test to see your performance history here.
              </p>
            </div>
          ) : (
            <HistoryTable history={history} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
