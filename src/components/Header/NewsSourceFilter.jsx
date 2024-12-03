import React, { useState, useEffect, useCallback } from "react";
import { COUNTRIES } from "../../utils/helpers";
import Loader from "../Loader/Loader";
import { fetchArticlesBySource, fetchSources } from "../../api/SourceAPI";
import SourceFilteredArticle from "../UI/SourceFilterArticle";

const NewsSourceFilter = () => {
  // State management
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => (prevCount === 10 ? sources.length : 10)); // Toggle between 10 and all
  };

  // Fetch available news sources
  const fetchNewsSources = useCallback(async () => {
    try {
      const filteredSource = await fetchSources(selectedCountry);
      setSources(filteredSource);
      setSelectedSource(null); // Reset selected source when country changes
      setArticles([]); // Clear previous articles
    } catch (err) {
      console.error("Error fetching news sources:", err);
      setError("Failed to load news sources");
    }
  }, [selectedCountry]);

  // Fetch articles for a specific source
  const fetchSourceArticles = useCallback(async (sourceId) => {
    setIsLoading(true);
    setError(null);

    try {
      const validArticles = await fetchArticlesBySource(sourceId);
      setArticles(validArticles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch sources on component mount and when country changes
  useEffect(() => {
    fetchNewsSources();
  }, [fetchNewsSources]);

  // Handle source selection
  const handleSourceSelect = (source) => {
    setSelectedSource(source);
    fetchSourceArticles(source.id);
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  // Render component
  return (
    <>
      {/* Country Selection Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="country-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Country
        </label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => handleCountrySelect(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

     
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
        {sources.slice(0, visibleCount).map((source) => (
          <button
            key={source.id}
            onClick={() => handleSourceSelect(source)}
            className={`px-2 py-1 text-sm rounded-lg transition-colors ${
              selectedSource?.id === source.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } whitespace-nowrap`}
          >
            {source.name}
          </button>
        ))}
        {sources.length === 0 && <Loader text="Loading Source..." />}
      {/* Show More Button */}
      {sources.length > 10 && (

          <button
            onClick={handleShowMore}
            className="px-2 py-1 text-sm  font-semibold hover:text-white  rounded-lg hover:bg-blue-700 "
          >
            {visibleCount === 10 ? "Show More" : "Show Less"}
          </button>
      
      )}
      </div>


      <SourceFilteredArticle
        selectedSource={selectedSource}
        isLoading={isLoading}
        error={error}
        articles={articles}
      />
    </>
  );
};

export default NewsSourceFilter;
