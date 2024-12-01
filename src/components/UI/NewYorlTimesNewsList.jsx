import React, { useEffect, useState } from "react";
import { fetchTopStories } from "../../api/NYTimesAPI.js";
import NewsCard from "./NewsCard";
import { formatTimeAgo } from "../../utils/helpers.js";
import Loader from "../Loader/Loader.jsx";

const NewYorlTimesNewsList = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch API data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await fetchTopStories(); // `fetchTopStories` now directly returns `results`
        setNewsItems(data); // Use the fetched results
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news data.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Render loading or error state
  if (loading) {
    return <Loader text="Loading..." />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="py-6">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((news, index) => (
          <NewsCard
            key={index}
            source={news.section || "Unknown"}
            title={news.title}
            timeAgo={formatTimeAgo(news.updated_date)}

            image={
              news.multimedia && news.multimedia[0]
                ? news.multimedia[0].url
                : "https://via.placeholder.com/150"
            }
            url={news.url}
          />
        ))}
      </div>
    </div>
  );
};

export default NewYorlTimesNewsList;
