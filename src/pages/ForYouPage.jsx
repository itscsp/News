import React, { useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import { CATEGORY, COUNTRIES, formatTimeAgo } from "../utils/helpers";
import NewsCard from "../components/UI/NewsCard";

const ForYouPage = () => {
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [fetchedData, setFetchedData] = useState({
    category: { articles: [], page: 1 },
    country: { articles: [], page: 1 },
    source: { articles: [], page: 1 },
  });

  const [totalCategoryCount, setTotalCategoryCount] = useState(0);
  const [totalCountryCount, setTotalCountryCount] = useState(0);
  const [totalSourceCount, setTotalSourceCount] = useState(0);

  const fetchSources = useCallback(async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/sources?language=en&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
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

  const fetchData = async ({ type, value, page = 1 }) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page);
      queryParams.append("pageSize", 10);

      if (type === "category") queryParams.append("category", value);
      if (type === "country") queryParams.append("country", value);
      if (type === "source") queryParams.append("sources", value);

      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?language=en&${queryParams.toString()}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );

      if (!response.ok)
        throw new Error(`Failed to fetch data for ${type}: ${value}`);

      const data = await response.json();

      setFetchedData((prevData) => ({
        ...prevData,
        [type]: {
          articles: [...prevData[type].articles, ...data.articles],
          page,
        },
      }));

      // Update total counts from API response
      if (type === "category") setTotalCategoryCount(data.totalResults);
      if (type === "country") setTotalCountryCount(data.totalResults);
      if (type === "source") setTotalSourceCount(data.totalResults);
    } catch (err) {
      console.error(`Error fetching data for ${type}:`, err);
    }
  };


  const handleSave = () => {
    const preferences = {
      category: selectedCategory,
      country: selectedCountry,
      source: selectedSource,
    };
  
    localStorage.setItem("newsFilters", JSON.stringify(preferences));
  
    // Reset fetched data before fetching new data
    setFetchedData({
      category: { articles: [], page: 1 },
      country: { articles: [], page: 1 },
      source: { articles: [], page: 1 },
    });
  
    // Reset total counts
    setTotalCategoryCount(0);
    setTotalCountryCount(0);
    setTotalSourceCount(0);
  
    // Fetch data based on selected preferences
    if (selectedCategory)
      fetchData({ type: "category", value: selectedCategory });
    if (selectedCountry) fetchData({ type: "country", value: selectedCountry });
    if (selectedSource) fetchData({ type: "source", value: selectedSource });
  
    setIsModalOpen(false);
  };

  const handleLoadMore = (type) => {
    const nextPage = fetchedData[type].page + 1;
    const value =
      type === "category"
        ? selectedCategory
        : type === "country"
        ? selectedCountry
        : selectedSource;

    fetchData({ type, value, page: nextPage });
  };

  useEffect(() => {
    fetchSources();

    const storedPreferences = JSON.parse(localStorage.getItem("newsFilters"));
    if (storedPreferences) {
      setSelectedCategory(storedPreferences.category);
      setSelectedCountry(storedPreferences.country);
      setSelectedSource(storedPreferences.source);

      if (storedPreferences.category) {
        fetchData({ type: "category", value: storedPreferences.category });
      }
      if (storedPreferences.country) {
        fetchData({ type: "country", value: storedPreferences.country });
      }
      if (storedPreferences.source) {
        fetchData({ type: "source", value: storedPreferences.source });
      }
    } else {
      setIsModalOpen(true);
    }
  }, [fetchSources]);

  return (
    <div className="py-16">
      <div className="flex justify-between align-middle">
      <h1>For You</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Open Preferences
      </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Customize Your Preference"
        maxWidth="max-w-4xl"
      >
        <div>
          <h3>Select Category</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORY.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <h3>Select Country</h3>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedCountry === country.code
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {country.name}
              </button>
            ))}
          </div>

          <h3>Select Source</h3>
          <div className="flex flex-wrap gap-2">
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedSource(source.id)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedSource === source.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {source.name}
              </button>
            ))}
          </div>

          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handleSave}
          >
            Save Preferences
          </button>
        </div>
      </Modal>

      <div className="grid lg:grid-cols-3 gap-6">
        {["category", "country", "source"].map((type) => {
          const articles = fetchedData[type]?.articles || [];
          const totalCount = {
            category: totalCategoryCount,
            country: totalCountryCount,
            source: totalSourceCount,
          }[type];

          return (
            articles.length > 0 && (
              <div key={type} className=" bg-white rounded-xl mt-5">
                <h3 className="">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Data
                </h3>
                <div className="max-h-[75vh] overflow-auto min-h-[600px]">
                  <div className="py-3">
                    {articles.map((article, index) => (
                      <NewsCard
                        key={index}
                        title={article.title}
                        description={article.description}
                        timeAgo={formatTimeAgo(article.publishedAt)}
                        url={article.url}
                        image={
                          article.urlToImage ||
                          "https://via.placeholder.com/150"
                        }
                      />
                    ))}
                  </div>

                  {articles.length < totalCount && (
                    <button
                      onClick={() => handleLoadMore(type)}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Load More
                    </button>
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ForYouPage;
