import { useState, useCallback, useEffect } from "react";
import { fetchNewsData, fetchNewsSources } from "../api/ForYouPageAPI";

export const useNewsData = (apiKey) => {
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState({
    category: { articles: [], page: 1 },
    country: { articles: [], page: 1 },
    source: { articles: [], page: 1 },
  });

  const [totalCounts, setTotalCounts] = useState({
    category: 0,
    country: 0,
    source: 0,
  });

  const loadSources = useCallback(async () => {
    try {
      const fetchedSources = await fetchNewsSources(apiKey);
      setSources(fetchedSources);
    } catch (err) {
      setError("Failed to load news sources");
    }
  }, [apiKey]);

  const fetchNews = async ({ type, value, page = 1 }) => {
    try {
      const data = await fetchNewsData({ 
        type, 
        value, 
        page, 
        apiKey 
      });

      setFetchedData((prevData) => ({
        ...prevData,
        [type]: {
          articles: page === 1 
            ? data.articles 
            : [...prevData[type].articles, ...data.articles],
          page,
        },
      }));

      setTotalCounts((prev) => ({
        ...prev,
        [type]: data.totalResults,
      }));

      return data;
    } catch (err) {
      console.error(`Error fetching ${type} news:`, err);
    }
  };

  const resetData = (type) => {
    setFetchedData((prev) => ({
      ...prev,
      [type]: { articles: [], page: 1 },
    }));
    setTotalCounts((prev) => ({
      ...prev,
      [type]: 0,
    }));
  };

  return {
    sources,
    fetchedData,
    totalCounts,
    error,
    loadSources,
    fetchNews,
    resetData,
  };
};