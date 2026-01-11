import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const HistoryTable = ({ history }) => {
  const [openRow, setOpenRow] = useState(null);

  if (!history || history.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-white/40 backdrop-blur-lg p-10 text-center text-gray-600">
        <p className="text-lg font-semibold">No test history yet</p>
        <p className="text-sm mt-1 opacity-80">
          Your completed tests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl bg-white/40 backdrop-blur-lg overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-black/10">
        <h3 className="text-lg font-semibold text-gray-800">Test History</h3>
        <p className="text-sm text-gray-600 mt-1">
          Click a row to view detailed performance
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-700 uppercase text-xs tracking-wider">
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Accuracy</th>
              <th className="px-6 py-4 text-center"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-black/10">
            {history.map((item) => {
              const rowId = item._id || item.id;
              const isOpen = openRow === rowId;
              const percentage = item.score_percentage;

              return (
                <>
                  {/* MAIN ROW */}
                  <tr
                    key={rowId}
                    onClick={() => setOpenRow(isOpen ? null : rowId)}
                    className={`cursor-pointer transition
                      hover:bg-indigo-50
                      ${isOpen ? "bg-indigo-50/60" : ""}
                    `}
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {formatDate(item.created_at)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold
                          ${
                            percentage >= 80
                              ? "bg-green-100 text-green-700"
                              : percentage >= 50
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {percentage}%
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center text-indigo-700">
                      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </td>
                  </tr>

                  {/* DROPDOWN DETAILS */}
                  {isOpen && (
                    <tr key={`${rowId}-details`} className="bg-indigo-50/40">
                      <td colSpan={3} className="px-6 py-6">
                        {/* PROGRESS BAR */}
                        <div className="mb-6">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Accuracy</span>
                            <span>{percentage}%</span>
                          </div>

                          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                            <p className="text-xs uppercase text-gray-500">
                              Total
                            </p>
                            <p className="text-xl font-bold text-gray-800">
                              {item.total_questions}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                            <p className="text-xs uppercase text-gray-500">
                              Correct
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              {item.correct_answers}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                            <p className="text-xs uppercase text-gray-500">
                              Incorrect
                            </p>
                            <p className="text-xl font-bold text-red-600">
                              {item.total_questions - item.correct_answers}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
