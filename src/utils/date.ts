import { Timestamp } from "firebase-admin/firestore";

/**
 * Converts a JavaScript Date to a Firebase Timestamp
 */
export const dateToTimestamp = (
  date: Date | null | undefined
): Timestamp | null => {
  if (!date) return null;
  return Timestamp.fromDate(date);
};

/**
 * Converts a Firebase Timestamp to a JavaScript Date
 */
export const timestampToDate = (
  timestamp: Timestamp | null | undefined
): Date | null => {
  if (!timestamp) return null;
  return timestamp.toDate();
};
