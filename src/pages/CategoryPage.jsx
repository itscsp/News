import React, { useState, useEffect } from "react";
import { FaBusinessTime, FaHeartbeat, FaRegNewspaper, FaFlask, FaRunning, FaTv, FaGlobe } from "react-icons/fa";
import NewsCard from "../components/UI/NewsCard"; // Import NewsCard component
import { formatTimeAgo } from "../utils/helpers";

const categories = [
  { id: "general", name: "General", icon: <FaRegNewspaper /> },
  { id: "business", name: "Business", icon: <FaBusinessTime /> },
  { id: "entertainment", name: "Entertainment", icon: <FaTv /> },
  { id: "health", name: "Health", icon: <FaHeartbeat /> },
  { id: "science", name: "Science", icon: <FaFlask /> },
  { id: "sports", name: "Sports", icon: <FaRunning /> },
  { id: "technology", name: "Technology", icon: <FaGlobe /> },
];

const CategoryPage = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${activeCategory}&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles.filter(item => item.title !== "[Removed]") || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, [activeCategory]);

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
              <span className="w-4 h-4 me-2">{category.icon}</span>
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
        {articles.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            {articles.map((article, index) => (
               <NewsCard
               title={article.title}
               description={article.description}
           timeAgo={formatTimeAgo(article.publishedAt)}

               url={article.url}
               image={
                article.urlToImage ? article.urlToImage : "https://via.placeholder.com/150" // Placeholder image if no image is provided
               }
             />
            ))}
          </div>
        ) : (
          <p>No articles available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
