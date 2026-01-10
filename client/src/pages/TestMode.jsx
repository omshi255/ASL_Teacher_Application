import { useState } from "react";
import CameraFeed from "../components/Camera/CameraFeed";
import { TEST_SIGNS } from "../utils/testSigns";
import { submitTestResult } from "../api/testApi";

const TestMode = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // true / false
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = TEST_SIGNS.length;
  const currentSign = TEST_SIGNS[currentIndex];

  const handleDecision = async (isCorrect) => {
    const updated = [...answers, isCorrect];
    setAnswers(updated);

    // move to next sign
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    // submit result
    try {
      setLoading(true);
      const score = updated.filter(Boolean).length;

      await submitTestResult({
        score,
        total,
      });

      setCompleted(true);
    } catch (err) {
      setError(err.message || "Failed to submit result");
    } finally {
      setLoading(false);
    }
  };

  // 🔚 RESULT SCREEN
  if (completed) {
    const score = answers.filter(Boolean).length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Test Completed</h1>

        <p className="mt-4 text-lg">
          Score: <b>{score}</b> / {total}
        </p>

        <p className="text-lg">
          Percentage: <b>{percentage}%</b>
        </p>

        <p className="mt-2 text-green-600">Result saved successfully</p>
      </div>
    );
  }

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Submitting result...
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  // 🎥 TEST SCREEN
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h2 className="mt-4 text-xl font-semibold">
        Sign {currentIndex + 1} of {total}
      </h2>

      <p className="mt-2 text-lg">
        Perform: <b>{currentSign}</b>
      </p>

      <CameraFeed
        currentSign={currentSign}
        testMode
        onDecision={handleDecision}
      />
    </div>
  );
};

export default TestMode;
