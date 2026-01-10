import { formatDate } from "../../utils/formatDate";

const HistoryTable = ({ history }) => {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Score (%)</th>
        </tr>
      </thead>

      <tbody>
        {history.map((item) => (
          <tr key={item._id} className="text-center">
            <td className="border px-4 py-2">{formatDate(item.created_at)}</td>
            <td className="border px-4 py-2 font-semibold">
              {item.score_percentage}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryTable;
