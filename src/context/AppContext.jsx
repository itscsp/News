import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchTopStories } from "../api/NYTimesAPI";
import { fetchGuardianNews } from "../api/GuardianAPI";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState({});

  const [nyTimesArticles, setNyTimesArticles] = useState({
    articles: [],
    currentPage: 1,
    totalArticles: 0,
    hasMore: true,
  });

  const [guardianArticles, setGuardianArticles] = useState({
    "global-development": {
      articles: [],
      currentPage: 1,
      totalPages: 0,
      hasMore: true,
    },
    politics: {
      articles: [],
      currentPage: 1,
      totalPages: 0,
      hasMore: true,
    },
  });

  const [activeCategory, setActiveCategory] = useState("general");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Existing categories setup
    setCategories([
      { id: "general", name: "General" },
      { id: "business", name: "Business" },
      { id: "entertainment", name: "Entertainment" },
      { id: "health", name: "Health" },
      { id: "science", name: "Science" },
      { id: "sports", name: "Sports" },
      { id: "technology", name: "Technology" },
    ]);

    // Initial fetch for NYT stories
    const fetchInitialNYTStories = async () => {
      try {
        setIsLoading(true);
        const nyTimesData = await fetchTopStories();
        setNyTimesArticles({
          articles: nyTimesData.articles,
          currentPage: nyTimesData.currentPage,
          totalArticles: nyTimesData.totalArticles,
          hasMore: nyTimesData.hasMore,
        });
      } catch (error) {
        console.error("Error fetching NYT stories:", error);
      }
    };

    // In the initial fetch
    const fetchInitialGuardianStories = async () => {
      try {
        const globalData = await fetchGuardianNews("global-development");
        const politicsData = await fetchGuardianNews("politics");

        setGuardianArticles({
          "global-development": {
            articles: globalData.articles,
            currentPage: globalData.currentPage,
            totalPages: globalData.totalPages,
            hasMore: globalData.hasMore,
          },
          politics: {
            articles: politicsData.articles,
            currentPage: politicsData.currentPage,
            totalPages: politicsData.totalPages,
            hasMore: politicsData.hasMore,
          },
        });
      } catch (error) {
        console.error("Error fetching Guardian stories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialNYTStories();
    fetchInitialGuardianStories();
  }, []);

  const fetchArticles = async (category) => {
    if (articles[category]) return; // Skip fetching if data exists
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await fetch(url);
      const data = await response.json();
      setArticles((prev) => ({
        ...prev,
        [category]: data.articles.filter((item) => item.title !== "[Removed]"),
      }));
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Load more NYT stories
  const loadMoreNYTStories = async () => {
    if (!nyTimesArticles.hasMore) return;

    try {
      setIsLoading(true);
      const nextPage = nyTimesArticles.currentPage + 1;
      const newData = await fetchTopStories(nextPage);

      setNyTimesArticles((prev) => ({
        articles: [...prev.articles, ...newData.articles],
        currentPage: newData.currentPage,
        totalArticles: newData.totalArticles,
        hasMore: newData.hasMore,
      }));
    } catch (error) {
      console.error("Error loading more NYT stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // In AppContext.jsx
  const loadMoreGuardianStories = async (section) => {
    // Add validation for the section
    if (!["global-development", "politics"].includes(section)) {
      console.error(`Invalid section: ${section}`);
      return;
    }

    // Add null/undefined check
    if (!guardianArticles[section]) {
      console.error(`Section ${section} does not exist in guardian articles`);
      return;
    }

    if (!guardianArticles[section].hasMore) return;

    try {
      setIsLoading(true);
      const nextPage = guardianArticles[section].currentPage + 1;
      const newData = await fetchGuardianNews(section, nextPage);

      setGuardianArticles((prev) => {
        // Create a new object to ensure we're not modifying the original state directly
        const updatedArticles = { ...prev };

        updatedArticles[section] = {
          articles: [...prev[section].articles, ...newData.articles],
          currentPage: newData.currentPage,
          totalPages: newData.totalPages,
          hasMore: newData.hasMore,
        };

        return updatedArticles;
      });
    } catch (error) {
      console.error(`Error loading more ${section} Guardian stories:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        articles,
        fetchArticles,
        nyTimesArticles,
        guardianArticles,
        activeCategory,
        isLoading,
        setActiveCategory,
        loadMoreNYTStories,
        loadMoreGuardianStories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
