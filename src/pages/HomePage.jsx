import React from "react";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader/Loader";
import NewsCard from "../components/UI/NewsCard";
import { formatTimeAgo, sliceTitle } from "../utils/helpers";

const HomePage = () => {
  const {
    nyTimesArticles,
    guardianArticles,
    isLoading,
    loadMoreNYTStories,
    loadMoreGuardianStories,
  } = useAppContext();

  return (
    <div className="py-14">
      <h1 className="text-4xl font-bold text-gray-800 mt-4">Top Stories</h1>

      {/* New York Times Section */}
      <div className="bg-white px-4 py-2 rounded mt-4">
        <div className="content text-center">
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            The New York Times
          </h2>
          <p className="text-md text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore the latest headlines, expert insights, and captivating
            stories from around the globe, all in one place.
          </p>
        </div>

        {isLoading && nyTimesArticles.articles.length === 0 ? (
          <Loader text="Loading..." />
        ) : (
          <div className="py-6">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {nyTimesArticles.articles.map((news, index) => (
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

            {nyTimesArticles.hasMore && (
              <div className="text-center mt-6">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    onClick={loadMoreNYTStories}
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guardian News Section */}
      <div className="bg-white px-4 py-2 rounded mt-16">
        <div className="content text-center">
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            The Guardian
          </h2>
          <p className="text-md text-gray-600 mt-2">
            Stay informed with the latest news and in-depth analyses.
          </p>
        </div>

        {isLoading &&
        guardianArticles["global-development"].articles.length === 0 ? (
          <Loader text="Loading..." />
        ) : (
          <div className="py-6">
            <h3 className="text-xl font-bold dark:text-white">
              Global Development
            </h3>
            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
              {guardianArticles["global-development"].articles.map(
                (news, index) => (
                  <NewsCard
                    key={`global-${index}`}
                    section="Global Development"
                    title={sliceTitle(news.webTitle, 14)}
                    timeAgo={formatTimeAgo(news.webPublicationDate)}
                    image={"https://placehold.co/150x150?text=News"}
                    url={news.webUrl}
                  />
                )
              )}
            </div>

            {guardianArticles["global-development"].hasMore && (
              <div className="text-center mt-6">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    onClick={() =>
                      loadMoreGuardianStories("global-development")
                    }
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Load More{" "}
                  </button>
                )}
              </div>
            )}

            <h3 className="text-xl font-bold dark:text-white mt-8">Politics</h3>
            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
              {guardianArticles["politics"].articles.map((news, index) => (
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

            {guardianArticles["politics"].hasMore && (
              <div className="text-center mt-6">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    onClick={() => loadMoreGuardianStories("politics")}
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
