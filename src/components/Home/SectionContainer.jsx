import React from "react";
import Loader from "../Loader/Loader";


const SectionContainer = ({ title, description, children, isLoading, loadMore, hasMore }) => {
  return (
    <div className="bg-white px-4 py-2 rounded mt-4">
      <div className="content text-center">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mt-2">{title}</h2>
        {description && <p className="text-md text-gray-600 mt-2 max-w-2xl mx-auto">{description}</p>}
      </div>
      {isLoading && !children ? (
        <Loader text="Loading..." />
      ) : (
        <>
          <div className="py-6">{children}</div>
          {hasMore && (
            <div className="text-center mt-6">
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SectionContainer;
