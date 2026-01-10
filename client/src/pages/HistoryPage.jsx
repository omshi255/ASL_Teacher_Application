import useTestHistory from "../components/hooks/useTestHistory";
import { formatDate } from "../utils/formatDate";

const HistoryPage = () => {
  const { history, loading, error } = useTestHistory();

  if (loading) return <div className="p-4">Loading history…</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Test History</h1>

      {history.length === 0 ? (
        <p>No attempts found.</p>
      ) : (
        <table className="border w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Score</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{formatDate(item.created_at)}</td>
                <td>
                  {item.correct_answers} / {item.total_questions}
                </td>
                <td>{item.score_percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryPage;
