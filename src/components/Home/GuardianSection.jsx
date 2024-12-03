import React from "react";
import NewsCard from "../UI/NewsCard";
import SectionContainer from "./SectionContainer";

const GuardianSection = ({ categories, articles, isLoading, loadMore }) => {
  return categories.map((category) => (
    <SectionContainer
      key={category}
      title={category.replace("-", " ").toUpperCase()}
      isLoading={isLoading}
      loadMore={() => loadMore(category)}
      hasMore={articles[category]?.hasMore}
    >
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
        {articles[category]?.articles.map((news, index) => (
          <NewsCard
            key={`${category}-${index}`}
            section={category}
            title={news.webTitle}
            timeAgo={news.webPublicationDate}
            image={"https://placehold.co/150x150?text=News"}
            url={news.webUrl}
          />
        ))}
      </div>
    </SectionContainer>
  ));
};

export default GuardianSection;
