import React, { useEffect, useState } from "react";
import { fetchGuardianNews } from "../../api/GuardianAPI";
import NewsCard from "./NewsCard";
import { formatTimeAgo, sliceTitle } from "../../utils/helpers";
import Loader from "../Loader/Loader";

const GuardianNewsList = () => {
  const [globalDevelopmentNews, setGlobalDevelopmentNews] = useState([]);
  const [politicsNews, setPoliticsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news data from both endpoints
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const globalData = await fetchGuardianNews("global-development");
        const politicsData = await fetchGuardianNews("politics");

        setGlobalDevelopmentNews(globalData);
        setPoliticsNews(politicsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news data.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Render loading or error states
  if (loading) {
    return <Loader text="Loading..." />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="py-6">
      <h3 className="text-xl font-bold dark:text-white">Global Development</h3>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
        {globalDevelopmentNews.map((news, index) => (
          <NewsCard
            key={`global-${index}`}
            section="Global Developments"
            title={sliceTitle(news.webTitle, 14)}
            timeAgo={formatTimeAgo(news.webPublicationDate)}
            image={"https://placehold.co/150x150?text=News"}
            url={news.webUrl}
          />
        ))}
      </div>

      <h3 className="text-xl font-bold dark:text-white mt-8">Politics</h3>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
        {politicsNews.map((news, index) => (
          <NewsCard
            key={`politics-${index}`}
            section="Politics"
            title={sliceTitle(news.webTitle, 14)}
            timeAgo={formatTimeAgo(news.webPublicationDate)}
            image={"https://placehold.co/150x150?text=News"}
            url={news.webUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default GuardianNewsList;
