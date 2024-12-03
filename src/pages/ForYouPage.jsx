import React, { useContext, useState } from "react";
import Modal from "../components/Modal/Modal";
import NewsCard from "../components/UI/NewsCard";
import PreferenceButton from "../components/UI/PreferenceButton";
import { NewsContext } from "../context/NewsContext";
import { CATEGORY, COUNTRIES, formatTimeAgo } from "../utils/helpers";
import Loader from "../components/Loader/Loader.jsx";

const ForYouPage = () => {
  const {
    sources,
    fetchedData,
    totalCounts,
    selectedPreferences,
    setSelectedPreferences,
    fetchNews,
    resetData,
  } = useContext(NewsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  const handleSave = () => {
    const storedPreferences = JSON.parse(localStorage.getItem("newsFilters")) || {};

    const changedPreferences = Object.entries(selectedPreferences).filter(
      ([type, value]) => storedPreferences[type] !== value
    );

    localStorage.setItem("newsFilters", JSON.stringify(selectedPreferences));

    changedPreferences.forEach(([type, value]) => {
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

  const handleShowMore = () => {
    setVisibleCount((prevCount) => (prevCount === 20 ? sources.length : 20));
  };

  return (
    <div className="py-6">
      <div className="flex justify-between align-middle">
        <h1 className="text-2xl font-medium">For You</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Preferences
        </button>
      </div>

      {/* Modal for preferences */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Customize Your Preference"
        maxWidth="max-w-4xl"
      >
        <div>
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-600 dark:text-gray-300">
              Select Option
            </h2>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={handleSave}
            >
              Save Preferences
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-2 md:gap-5">
            {/* Category Preferences */}
            <div className="py-2 md:py-4">
              <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">
                Category
              </h3>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {CATEGORY.map((category) => (
                  <PreferenceButton
                    key={category.id}
                    item={category.id}
                    selected={selectedPreferences.category}
                    onSelect={(category) =>
                      setSelectedPreferences((prev) => ({ ...prev, category }))
                    }
                  />
                ))}
              </div>
            </div>

            {/* Country Preferences */}
            <div className="pt-2 pb-4 md:py-4">
              <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">
                Country
              </h3>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {COUNTRIES.map((country) => (
                  <PreferenceButton
                    key={country.code}
                    item={country}
                    selected={selectedPreferences.country}
                    onSelect={(country) =>
                      setSelectedPreferences((prev) => ({ ...prev, country }))
                    }
                    getKey={(country) => country.name}
                    getLabel={(country) => country.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">
              Source
            </h3>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {sources.slice(0, visibleCount).map((source) => (
                <PreferenceButton
                  key={source.id}
                  item={source}
                  selected={selectedPreferences.source}
                  onSelect={(source) =>
                    setSelectedPreferences((prev) => ({ ...prev, source }))
                  }
                  getKey={(source) => source.id}
                  getLabel={(source) => source.name}
                />
              ))}
              {sources.length === 0 && <Loader text="Loading Source..." />}
              {sources.length > 10 && (
                <button
                  onClick={handleShowMore}
                  className="px-2 py-1 text-sm  font-semibold hover:text-white  rounded-lg hover:bg-blue-700 "
                >
                  {visibleCount === 20 ? "Show More" : "Show Less"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {Object.values(selectedPreferences).every((value) => !value) ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="mb-2">
            Please choose your preferences to see news articles.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Preferences
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {["category", "country", "source"].map((type) => {
            const articles = fetchedData[type]?.articles || [];
            const totalCount = totalCounts[type];

            return articles.length > 0 ? (
              <div key={type} className="bg-white rounded-xl mt-5">
                <h3 className="px-4 py-2 text-xl flex items-center gap-3 justify-start uppercase">
                  {selectedPreferences[type]}
                </h3>
                <div className="max-h-[75vh] overflow-auto min-h-[600px] bg-white">
                  <div className="py-3 flex flex-col gap-1">
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
            ) : (
              <div key={type} className="bg-white rounded-xl mt-5"></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ForYouPage;
