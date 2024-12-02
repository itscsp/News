import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import NewsCard from "../components/UI/NewsCard";
import Loader from "../components/Loader/Loader";
import { formatTimeAgo } from "../utils/helpers";

const CategoryPage = () => {
  const { categories, activeCategory, setActiveCategory, fetchArticles, articles } = useAppContext();

  useEffect(() => {
    fetchArticles(activeCategory);
  }, [activeCategory]);

  const categoryArticles = articles[activeCategory] || [];

  return (
    <div className="md:flex pt-10">
      {/* Tabs Section */}
      <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                activeCategory === category.id
                  ? "text-white bg-blue-700 dark:bg-blue-600"
                  : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Articles Section */}
      <div className="md:p-6 pt-0 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News
        </h3>
        {categoryArticles.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            {categoryArticles.map((article, index) => (
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
          <Loader text={`Loading ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Articles...`} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
