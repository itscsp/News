import React, { createContext, useState, useEffect, useCallback } from "react";
import { fetchNewsData, fetchNewsSources } from "../api/ForYouPageAPI";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [sources, setSources] = useState([]);
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
  const [error, setError] = useState(null);
  const [selectedPreferences, setSelectedPreferences] = useState({
    category: null,
    country: null,
    source: null,
  });

  const loadSources = useCallback(async () => {
    try {
      const fetchedSources = await fetchNewsSources(apiKey);
      setSources(fetchedSources);
    } catch (err) {
      setError("Failed to load news sources");
    }
  }, [apiKey]);

  // Fetch news based on preferences
  const fetchNews = async ({ type, value, page = 1 }) => {
    try {
      const data = await fetchNewsData({ type, value, page, apiKey });

      const validArticles = data.articles.filter(
        (article) => article.title !== "[Removed]"
      );

      setFetchedData((prevData) => ({
        ...prevData,
        [type]: {
          articles:
            page === 1
              ? validArticles
              : [...prevData[type].articles, ...validArticles],
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

  // Reset data for a specific type
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

  // Save preferences to localStorage
  useEffect(() => {
    const storedPreferences = JSON.parse(localStorage.getItem("newsFilters"));
    if (storedPreferences) {
      setSelectedPreferences(storedPreferences);
      Object.entries(storedPreferences).forEach(([type, value]) => {
        if (value) fetchNews({ type, value });
      });
    } else {
      loadSources();
    }
  }, [loadSources]);

  // Ensure sources are fetched when the page is refreshed
  useEffect(() => {
    if (sources.length === 0) {
      loadSources();
    }
  }, [sources, loadSources]);

  return (
    <NewsContext.Provider
      value={{
        sources,
        fetchedData,
        totalCounts,
        error,
        selectedPreferences,
        setSelectedPreferences,
        loadSources,
        fetchNews,
        resetData,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
