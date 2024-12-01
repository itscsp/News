
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
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
  ];
  

export const CATEGORY = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
