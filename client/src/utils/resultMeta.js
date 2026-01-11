export const getResultMeta = (percentage) => {
  if (percentage >= 90) {
    return {
      badge: "gold",
      title: "Outstanding",
      quote: "You signed like a pro. Exceptional accuracy!",
    };
  }

  if (percentage >= 75) {
    return {
      badge: "silver",
      title: "Great Job",
      quote: "Strong performance. Just a little more practice!",
    };
  }

  if (percentage >= 50) {
    return {
      badge: "bronze",
      title: "Good Effort",
      quote: "You're getting there. Keep practicing!",
    };
  }

  return {
    badge: "beginner",
    title: "Keep Going",
    quote: "Every expert was once a beginner. Don't stop!",
  };
};
