import { useState, useEffect } from "react";
import { getResultMeta } from "../utils/resultMeta";
import { FiX } from "react-icons/fi";

const FlipResultCard = ({ score, total, onClose }) => {
  const percentage = Math.round((score / total) * 100);
  const meta = getResultMeta(percentage);

  const [flipped, setFlipped] = useState(false);

  // 🔹 ESC key to close (professional UX)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="relative w-80 h-[26rem] cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped((p) => !p)}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="absolute -top-4 -right-4 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <FiX size={18} />
        </button>

        {/* CARD */}
        <div
          className={`relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(.4,.2,.2,1)]
            ${flipped ? "rotate-y-180" : ""}
          `}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 bg-white rounded-3xl shadow-xl p-6
            flex flex-col items-center justify-center
            backface-hidden"
          >
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Your Accuracy
            </p>

            <h2 className="text-5xl font-extrabold text-indigo-600 mt-3 animate-pulse">
              {percentage}%
            </h2>

            <p className="mt-5 text-lg font-semibold text-gray-800">
              {meta.title}
            </p>

            <div className="mt-6 text-xs text-gray-400">Click card to flip</div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600
            text-white rounded-3xl shadow-xl p-6
            flex flex-col items-center justify-center text-center
            backface-hidden rotate-y-180"
          >
            <p className="text-sm uppercase opacity-80 tracking-wide">
              Feedback
            </p>

            <p className="mt-4 text-lg font-medium leading-relaxed">
              “{meta.quote}”
            </p>

            <div className="mt-6 px-4 py-1.5 rounded-full bg-white/20 text-sm">
              🏅 {meta.badge.toUpperCase()}
            </div>

            <p className="mt-6 text-xs opacity-70">Press ESC or ✕ to close</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipResultCard;
