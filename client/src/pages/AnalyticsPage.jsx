import useTestHistory from "../components/hooks/useTestHistory";

const AnalyticsPage = () => {
  const { history } = useTestHistory();

  if (history.length === 0) {
    return <div className="p-6">No analytics yet.</div>;
  }

  const avg =
    history.reduce((a, b) => a + b.score_percentage, 0) / history.length;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <p className="mt-4">
        Average Score: <b>{Math.round(avg)}%</b>
      </p>

      <p>Total Attempts: {history.length}</p>
    </div>
  );
};

export default AnalyticsPage;
