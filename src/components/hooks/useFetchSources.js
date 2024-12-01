import { useState, useCallback } from "react";

const useFetchSources = () => {
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null);

  const fetchSources = useCallback(async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/sources?language=en&apiKey=${import.meta.env.VITE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news source");
      }

      const data = await response.json();
      const filteredSources = data.sources.filter(
        (source) => source.url !== "https://news.google.com"
      );

      setSources(filteredSources);
    } catch (err) {
      console.error("Error fetching news sources:", err);
      setError("Failed to load news sources");
    }
  }, []);

  return { sources, error, fetchSources };
};

export default useFetchSources;
