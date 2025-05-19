// Basic spaced repetition scheduling for next review (days)
export function getNextReviewDate(correct, lastInterval) {
  if (!correct) return 1; // review again next day
  // Exponential increase: double the interval for each correct answer
  return Math.max(1, lastInterval * 2);
}