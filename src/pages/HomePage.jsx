import React from "react";
import GuardianNewsList from "../components/UI/GuardianNewsList";
import NewYorlTimesNewsList from "../components/UI/NewYorlTimesNewsList";

const HomePage = () => {
  return (
    <div className="py-14">
      <h1 className="text-4xl font-bold text-gray-800  mt-4">Top Stories </h1>
      <div className="bg-white px-4 py-2 rounded mt-4">
        <div className="content text-center">
          <h2 className="text-3xl font-bold text-gray-800 mt-2 ">
            The New York Times
          </h2>
          <p className="text-md text-gray-600  mt-2 max-w-2xl mx-auto">
            Explore the latest headlines, expert insights, and captivating
            stories from around the globe, all in one place.
          </p>
        </div>
        <NewYorlTimesNewsList />
      </div>
      <div className="bg-white px-4 py-2 rounded mt-16">
      <div className="content text-center">
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            The Guardian
          </h2>
          <p className="text-md text-gray-600 mt-2">
            Stay informed with the latest news, in-depth analyses.
          </p>
        </div>
        <GuardianNewsList />
      </div>
    </div>
  );
};

export default HomePage;
