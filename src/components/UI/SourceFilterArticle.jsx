import React from 'react';
import NewsCard from './NewsCard';
import Loader from '../Loader/Loader';
import { formatTimeAgo } from '../../utils/helpers';

const SourceFilteredArticle = ({ selectedSource, isLoading, error, articles }) => {
  return (
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
              image={article.urlToImage || 'https://via.placeholder.com/150'}
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
  );
};

export default SourceFilteredArticle;
