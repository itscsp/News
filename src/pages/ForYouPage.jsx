import React, { useEffect, useState, useCallback } from "react";
import Modal from "../components/Modal/Modal";
import PreferencesSelector from "../components/Header/PreferencesSelector";

const ForYouPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredResult, setFilteredResult] = useState([]);
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
  });

  const options = {
    categories: ["business", "entertainment", "general", "health", "science", "sports", "technology"],
  };

  // Fetch saved preferences from local storage
  useEffect(() => {
    const savedPreferences = localStorage.getItem("preferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const fetchNewsArticles = useCallback(async () => {
    const category = preferences.categories[0] || "general"; // Default to 'general' if no category is selected
    try {
      const url = `https://newsapi.org/v2/top-headlines?category=${category}&searchIn=title,description,content&language=en&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.articles.filter((item) => item.title !== "[Removed]") || [];
    } catch (error) {
      console.error("Error fetching the news:", error);
      return [];
    }
  }, [preferences]);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await fetchNewsArticles();
        console.log("Articles fetched:", articles);
        setSearchResult(articles);

        // Filter articles after fetching
        const filtered = articles.filter((article) => {
          const matchSource = preferences.sources.length
            ? preferences.sources.includes(article.source.name)
            : true;
          return matchSource;
        });

        console.log("Filtered Articles:", filtered);
        setFilteredResult(filtered);
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [fetchNewsArticles, preferences]);

  const articlesToShow = filteredResult.length > 0 ? filteredResult : searchResult;

  return (
    <div className="container">
      <div className="flex align-center justify-between py-4">
        <div className="heading">
          <h4 className="text-2xl font-medium dark:text-white">For You</h4>
          <p>Recommended based on your preferences</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Customize
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Customize Your News Feed"
          customClassName="items-center"
        >
          <PreferencesSelector options={options} setPreferences={setPreferences} />
        </Modal>
      </div>
      <div className="content h-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <p>Loading articles...</p>
          </div>
        ) : articlesToShow.length > 0 ? (
          <div>
            {articlesToShow.map((article, index) => (
              <div key={index} className="py-2">
                <h5 className="text-lg font-semibold">{article.title}</h5>
                <p className="text-sm text-gray-600">{article.description}</p>
                <p className="text-xs text-gray-400">Source: {article.source.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center py-4">
            <p>No articles match your preferences. Please adjust them.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForYouPage;
