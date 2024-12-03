import React from "react";
import NewsCard from "../UI/NewsCard";


const NewsSection = ({ boxName, type, articles, totalCount, loadMore, formatTimeAgo }) => {
  return (
    <div className="bg-white rounded-xl mt-5">
      <span className="mx-4 px-2 py-0 pb-1 mt-2 text-sx rounded text-white inline-block bg-blue-500 ">{boxName}</span>
      <h3 className="px-4 pb-2 text-base flex items-center gap-3 justify-start uppercase">
        {type}
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
              image={article.urlToImage || "https://via.placeholder.com/150"}
            />
          ))}
        </div>

        {articles.length < totalCount && (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsSection;