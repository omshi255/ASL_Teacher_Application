import { useNavigate } from "react-router-dom";
import { FiCamera, FiPlayCircle, FiBarChart2, FiClock } from "react-icons/fi";

const CameraSetup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to <span className="text-indigo-600">ASL Teacher</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            ASL Teacher uses your camera to analyze hand gestures in real time.
            Your video is processed locally and never stored.
          </p>
        </div>

        {/* ACTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActionCard
            icon={<FiCamera size={22} />}
            title="Start Learning"
            desc="Practice ASL signs with real-time camera guidance and feedback."
            onClick={() => navigate("/learn")}
          />

          <ActionCard
            icon={<FiPlayCircle size={22} />}
            title="Take a Test"
            desc="Test your ASL knowledge and get instant accuracy scores."
            onClick={() => navigate("/test")}
          />

          <ActionCard
            icon={<FiClock size={22} />}
            title="View History"
            desc="Review your past test attempts and track improvement."
            onClick={() => navigate("/history")}
          />

          <ActionCard
            icon={<FiBarChart2 size={22} />}
            title="View Analytics"
            desc="See performance trends and accuracy insights over time."
            onClick={() => navigate("/analytics")}
          />
        </div>
      </div>
    </div>
  );
};

export default CameraSetup;

/* ---------------- Helper Card ---------------- */

const ActionCard = ({ icon, title, desc, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left rounded-2xl border border-gray-200
        bg-white p-8 shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-md
        hover:border-indigo-300 hover:bg-indigo-50
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      "
    >
      <div className="flex items-start gap-5">
        {/* ICON */}
        <div
          className="
            w-12 h-12 rounded-xl flex items-center justify-center
            bg-indigo-50 text-indigo-600
            transition-colors duration-300
            group-hover:bg-indigo-600 group-hover:text-white
          "
        >
          {icon}
        </div>

        {/* TEXT */}
        <div>
          <p className="text-lg font-semibold text-gray-900">{title}</p>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </button>
  );
};
