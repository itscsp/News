import React, { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import NewsCard from "../components/UI/NewsCard";
import PreferenceButton from "../components/UI/PreferenceButton";
import { useNewsData } from "../hooks/useNewsData";
import { CATEGORY, COUNTRIES, formatTimeAgo } from "../utils/helpers.js";

const ForYouPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState({
    category: null,
    country: null,
    source: null,
  });

  const apiKey = import.meta.env.VITE_API_KEY;
  const {
    sources,
    fetchedData,
    totalCounts,
    loadSources,
    fetchNews,
    resetData,
  } = useNewsData(apiKey);

  useEffect(() => {
    loadSources();

    const storedPreferences = JSON.parse(localStorage.getItem("newsFilters"));
    if (storedPreferences) {
      setSelectedPreferences(storedPreferences);
      
      Object.entries(storedPreferences).forEach(([type, value]) => {
        if (value) {
          fetchNews({ type, value });
        }
      });
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("newsFilters", JSON.stringify(selectedPreferences));

    // Reset and fetch for each selected preference
    Object.entries(selectedPreferences).forEach(([type, value]) => {
      if (value) {
        resetData(type);
        fetchNews({ type, value });
      }
    });

    setIsModalOpen(false);
  };

  const handleLoadMore = (type) => {
    const value = selectedPreferences[type];
    const nextPage = fetchedData[type].page + 1;
    fetchNews({ type, value, page: nextPage });
  };

  return (
    <div className="py-6">
      <div className="flex justify-between align-middle">
        <h1>For You</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
        Customise
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Customize Your Preference"
        maxWidth="max-w-4xl"
      >

        <div>
          <div className="flex justify-between items-center">
            <h2>Select option</h2>
            <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handleSave}
          >
            Save Preferences
          </button>
          </div>
          <div className="grid grid-cols-2 gap-5">
<div>

          <h3>Select Category</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORY.map((category) => (
              <PreferenceButton
                key={category}
                item={category}
                selected={selectedPreferences.category}
                onSelect={(category) => 
                  setSelectedPreferences(prev => ({ ...prev, category }))
                }
              />
            ))}
          </div>
</div>

<div>

          <h3>Select Country</h3>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((country) => (
              <PreferenceButton
                key={country.code}
                item={country}
                selected={selectedPreferences.country}
                onSelect={(country) => 
                  setSelectedPreferences(prev => ({ ...prev, country }))
                }
                getKey={(country) => country.code}
                getLabel={(country) => country.name}
              />
            ))}
          </div>

</div>
          </div>

          <h3>Select Source</h3>
          <div className="flex flex-wrap gap-2">
            {sources.map((source) => (
              <PreferenceButton
                key={source.id}
                item={source}
                selected={selectedPreferences.source}
                onSelect={(source) => 
                  setSelectedPreferences(prev => ({ ...prev, source }))
                }
                getKey={(source) => source.id}
                getLabel={(source) => source.name}
              />
            ))}
          </div>

          
        </div>
      </Modal>

      <div className="grid lg:grid-cols-3 gap-6">
        {["category", "country", "source"].map((type) => {
          const articles = fetchedData[type]?.articles || [];
          const totalCount = totalCounts[type];

          return (
            articles.length > 0 && (
              <div key={type} className="bg-white rounded-xl mt-5">
                <h3>
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