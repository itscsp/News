import React from "react";
import NewsCard from "../UI/NewsCard";
import SectionContainer from "./SectionContainer";

const NYTimesSection = ({ articles, isLoading, loadMore, hasMore }) => {
  return (
    <SectionContainer
      title="The New York Times"
      description="Explore the latest headlines, expert insights, and captivating stories from around the globe, all in one place."
      isLoading={isLoading}
      loadMore={loadMore}
      hasMore={hasMore}
    >
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((news, index) => (
          <NewsCard
            key={index}
            source={news.section || "Unknown"}
            title={news.title}
            timeAgo={news.updated_date}
            image={news.multimedia?.[0]?.url || "https://via.placeholder.com/150"}
            url={news.url}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default NYTimesSection;
