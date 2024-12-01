import React, { useState, useEffect, useCallback } from 'react';
import NewsCard from '../UI/NewsCard';
import { formatTimeAgo } from '../../utils/helpers';
import Loader from '../Loader/Loader';
import { IoNewspaper } from 'react-icons/io5';

const NewsSourceFilter = () => {
  // State management
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Available countries
  const COUNTRIES = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
  ];

  // Fetch available news sources
  const fetchNewsSources = useCallback(async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/sources?language=en&country=${selectedCountry}&apiKey=${import.meta.env.VITE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news sources');
      }

      const data = await response.json();
      // Filter out sources with limited country availability
      const filteredSources = data.sources
        .filter(source => 
          source.language === 'en' && 
          source.country === selectedCountry &&
          source.url !== "https://news.google.com"
        )
        .slice(0, 10); // Limit to first 10 sources
      
      setSources(filteredSources);
      setSelectedSource(null); // Reset selected source when country changes
      setArticles([]); // Clear previous articles
    } catch (err) {
      console.error('Error fetching news sources:', err);
      setError('Failed to load news sources');
    }
  }, [selectedCountry]);

  // Fetch articles for a specific source
  const fetchSourceArticles = useCallback(async (sourceId) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get articles from a specific source
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?language=en&sortBy=publishedAt&sources=${sourceId}&apiKey=${import.meta.env.VITE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      // Filter out removed articles
      const validArticles = data.articles.filter(
        article => article.title !== '[Removed]'
      );

      setArticles(validArticles);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles');
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
        <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-2">
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

      {/* Sources Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
        {sources.map((source) => (
          <button
            key={source.id}
            onClick={() => handleSourceSelect(source)}
            className={`
              px-3 py-2 text-sm rounded-lg transition-colors 
              ${selectedSource?.id === source.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }
              whitespace-nowrap
            `}
          >
            {source.name}
          </button>
        ))}
      </div>

      {/* Articles Display */}
      <div>
        {selectedSource && (
          <h2 className="text-2xl font-semibold mb-4">
            Articles from {selectedSource.name}
          </h2>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader text="Loading articles..." />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                timeAgo={formatTimeAgo(article.publishedAt)}
                url={article.url}
                image={
                  article.urlToImage || "https://via.placeholder.com/150"
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {selectedSource 
              ? 'No articles found for this source.' 
              : 'Select a news source to view articles.'}
          </p>
        )}
      </div>
    </>
  );
};

export default NewsSourceFilter;