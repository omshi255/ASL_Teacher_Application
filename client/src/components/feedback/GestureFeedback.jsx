// src/components/feedback/GestureFeedback.jsx

const GestureFeedback = ({ result }) => {
  if (!result) return null;

  return (
    <p
      className={`text-lg font-semibold mt-2 ${
        result === "Correct" ? "text-green-600" : "text-red-600"
      }`}
    >
      {result}
    </p>
  );
};

export default GestureFeedback;
