import React from "react";
import { useAppContext } from "../context/AppContext";
import NYTimesSection from "../components/Home/NYTimesSection";
import GuardianSection from "../components/Home/GuardianSection";

const HomePage = () => {
  const {
    nyTimesArticles,
    guardianArticles,
    isLoading,
    loadMoreNYTStories,
    loadMoreGuardianStories,
  } = useAppContext();

  return (
    <div className="py-6 md:py-14">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mt-4">Top Stories</h1>
      <NYTimesSection
        articles={nyTimesArticles.articles}
        isLoading={isLoading}
        loadMore={loadMoreNYTStories}
        hasMore={nyTimesArticles.hasMore}
      />
      <GuardianSection
        categories={Object.keys(guardianArticles)}
        articles={guardianArticles}
        isLoading={isLoading}
        loadMore={loadMoreGuardianStories}
      />
    </div>
  );
};

export default HomePage;
