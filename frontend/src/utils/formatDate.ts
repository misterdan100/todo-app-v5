/**
 * Formats a date to the pattern "DD MMM YYYY" (e.g., "2 Mar 2025")
 * @param date - The date to format
 * @returns A formatted date string
 */
export const formatDate = (date: Date | string | number): string => {
  const dateObj = new Date(date);

  // Use Intl.DateTimeFormat for localized formatting
  const formatter = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formatter.format(dateObj);
};



/**
 * Returns a relative time string (e.g., "2 days ago" or "in 3 months")
 * @param date - The date to compare with current time
 * @returns A relative time string
 */
export const getRelativeTimeString = (date: Date | string | number): string => {
  const dateObj = new Date(date);

  // Use Intl.RelativeTimeFormat for relative time
  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const now = new Date();
  const diffInMs = dateObj.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  // Choose appropriate time unit based on difference
  if (Math.abs(diffInDays) < 1) {
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
    return formatter.format(diffInHours, "hour");
  } else if (Math.abs(diffInDays) < 30) {
    return formatter.format(diffInDays, "day");
  } else if (Math.abs(diffInDays) < 365) {
    const diffInMonths = Math.round(diffInDays / 30);
    return formatter.format(diffInMonths, "month");
  } else {
    const diffInYears = Math.round(diffInDays / 365);
    return formatter.format(diffInYears, "year");
  }
};

// Default export for backward compatibility
export default formatDate;
