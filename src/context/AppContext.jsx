import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState({});
  const [activeCategory, setActiveCategory] = useState("general");

  useEffect(() => {
    // Fetch categories if needed or populate static data
    setCategories([
      { id: "general", name: "General" },
      { id: "business", name: "Business" },
      { id: "entertainment", name: "Entertainment" },
      { id: "health", name: "Health" },
      { id: "science", name: "Science" },
      { id: "sports", name: "Sports" },
      { id: "technology", name: "Technology" },
    ]);
  }, []);

  const fetchArticles = async (category) => {
    if (articles[category]) return; // Skip fetching if data exists
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
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

  return (
    <AppContext.Provider
      value={{
        categories,
        articles,
        activeCategory,
        setActiveCategory,
        fetchArticles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for consuming context
export const useAppContext = () => {
  return useContext(AppContext);
};
