export const NewsAPIRoot = 'https://newsapi.org/v2';

export const sliceTitle = (title, wordLimit = 10) => {
  const words = title.split(" ");
  const firstWords = words.slice(0, wordLimit).join(" ");
  return firstWords + (words.length > wordLimit ? "..." : "");
};

export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const publishedDate = new Date(dateString);
  const timeDifference = now - publishedDate; // Difference in milliseconds

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    // If it's more than a week old, return the full date
    return publishedDate.toLocaleString();
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

export const COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "in", name: "India" },
];

export const CATEGORY = [
  { id: "general", name: "General" },
  { id: "business", name: "Business" },
  { id: "entertainment", name: "Entertainment" },
  { id: "health", name: "Health" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "technology", name: "Technology" },
]

export const DATAERANGES = [
  {
    key: "last7Days",
    label: "Last 7 Days",
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      return { start, end };
    },
  },
  {
    key: "last15Days",
    label: "Last 15 Days",
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 15);
      return { start, end };
    },
  },
  {
    key: "last30Days",
    label: "Last 30 Days",
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30);
      return { start, end };
    },
  },
];
