import { useEffect, useState } from "react";
import CameraFeed from "../components/cameraSection/CameraFeed";
import { fetchSigns } from "../services/signs.service";
import { submitTestResult } from "../api/testApi";
import FlipResultCard from "./FlipResultCard";
import ResultSkeleton from "./ResultSkeleton";

const TestMode = () => {
  const [signs, setSigns] = useState([]); // ✅ always array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);

  /* ================= LOAD SIGNS FROM BACKEND ================= */
  useEffect(() => {
    fetchSigns()
      .then((res) => {
        // ✅ backend returns { success, total, data }
        setSigns(Array.isArray(res?.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load test signs");
        setLoading(false);
      });
  }, []);

  const total = Array.isArray(signs) ? signs.length : 0;
  const currentSign = signs[currentIndex]?.name;

  /* ================= HANDLE AUTO DECISION ================= */
  const handleDecision = (isCorrect) => {
    if (answers[currentIndex] !== undefined) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = isCorrect;

    setAnswers(updatedAnswers);

    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const resetTest = () => {
    setCompleted(false);
    setCurrentIndex(0);
    setAnswers([]);
    setError(null);
  };

  /* ================= SUBMIT TEST ================= */
  const handleSubmitTest = async () => {
    try {
      setSubmitting(true);

      const signResults = signs.map((sign, index) => ({
        sign: sign.name,
        isCorrect: answers[index] === true,
      }));

      const correctCount = signResults.filter((r) => r.isCorrect).length;

      await submitTestResult({
        correctAnswers: correctCount,
        totalQuestions: total,
        signResults,
      });

      setCompleted(true);
    } catch (err) {
      setError(err.message || "Failed to submit test");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50">
        <ResultSkeleton />
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  /* ================= RESULT ================= */
  if (completed) {
    const score =
      total > 0
        ? Math.round((answers.filter(Boolean).length / total) * 100)
        : 0;

    return <FlipResultCard score={score} total={100} onClose={resetTest} />;
  }

  /* ================= TEST SCREEN ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-3xl border-gray-300 p-8">
          {/* HEADER */}
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Test Mode
            </p>

            <h2 className="text-3xl font-bold text-indigo-600 mt-1">
              Sign {currentIndex + 1} of {total}
            </h2>

            <p className="mt-3 text-lg text-gray-700">
              Perform the sign for{" "}
              <span className="font-semibold text-indigo-600">
                {currentSign}
              </span>
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* CAMERA SECTION */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl bg-gray-100 border border-gray-300 shadow-sm p-3">
                <button
                  onClick={() => setCameraOn((p) => !p)}
                  className={`absolute top-4 right-4 z-20 px-4 py-2 rounded-full text-sm font-medium shadow
                    ${
                      cameraOn
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                </button>

                <div className="rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center min-h-[420px]">
                  {cameraOn ? (
                    <CameraFeed
                      currentSign={currentSign}
                      testMode
                      onDecision={handleDecision}
                    />
                  ) : (
                    <div className="text-gray-500 text-sm">
                      Camera is currently turned off
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="bg-gray-50 rounded-2xl p-6 h-full shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Test Instructions
              </h3>

              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Allow camera access before starting.</li>
                <li>• Perform each sign clearly.</li>
                <li>• Each sign is evaluated automatically.</li>
                <li>• One attempt per sign.</li>
              </ul>

              <div className="mt-6 text-sm text-gray-500">
                Progress:{" "}
                <span className="font-semibold text-indigo-600">
                  {answers.filter((a) => a !== undefined).length}
                </span>{" "}
                / {total} signs attempted
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleSubmitTest}
              disabled={
                answers.filter((a) => a !== undefined).length < total ||
                submitting
              }
              className="px-10 py-3 rounded-xl text-white font-semibold
                bg-indigo-600 hover:bg-indigo-700
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Test
            </button>
          </div>

          <p className="mt-6 text-sm text-center text-gray-500">
            Make sure you complete all signs before submitting the test.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestMode;
