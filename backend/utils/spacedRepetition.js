// utils/spacedRepetition.js

/**
 * Update interval, easeFactor, and dueDate based on user review feedback
 * @param {string} rating - One of: "easy", "hard", "again"
 * @param {number} previousInterval - Previous interval in days
 * @param {number} previousEaseFactor - Previous ease factor (typically starts at 2.5)
 * @returns {Object} updated spaced repetition data
 */
export function getUpdatedReviewData(rating, previousInterval, previousEaseFactor) {
  let easeFactor = previousEaseFactor;
  let interval = previousInterval;

  if (rating === 'easy') {
    easeFactor = Math.min(easeFactor + 0.1, 3.0); // upper cap
    interval = Math.round(interval * easeFactor);
  } else if (rating === 'hard') {
    interval = Math.max(1, Math.round(interval * 0.5));
  } else if (rating === 'again') {
    interval = 1;
    easeFactor = 2.5;
  }

  const dueDate = new Date(Date.now() + interval * 24 * 60 * 60 * 1000); // add interval in days

  return {
    easeFactor,
    interval,
    dueDate,
  };
}
