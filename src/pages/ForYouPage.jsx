import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import EmptyState from "../components/Preference/EmptyState";
import NewsSection from "../components/Preference/NewsSection";
import PreferencesModal from "../components/Preference/PreferencesModalWrapper";
import { formatTimeAgo } from "../utils/helpers";

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

      <PreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPreferences={selectedPreferences}
        setSelectedPreferences={setSelectedPreferences}
        sources={sources}
        visibleCount={visibleCount}
        handleShowMore={handleShowMore}
        handleSave={handleSave}
      />

      {Object.values(selectedPreferences).every((value) => !value) ? (
        <EmptyState openPreferences={() => setIsModalOpen(true)} />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {["category", "country", "source"].map((type) => {
            const articles = fetchedData[type]?.articles || [];
            const totalCount = totalCounts[type];
            return articles.length > 0 ? (
              <NewsSection
                key={type}
                boxName={type}
                type={selectedPreferences[type].replaceAll("-", " ").toUpperCase()}
                articles={articles}
                totalCount={totalCount}
                loadMore={() => handleLoadMore(type)}
                formatTimeAgo={formatTimeAgo}
              />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default ForYouPage;
