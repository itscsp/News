import React from "react";
import { Link } from "react-router";

const NewsCard = ({ source, title, timeAgo, image, url }) => {
  return (
    <Link to={url} target="_blank" className="flex bg-white shadow-md rounded-lg p-4 gap-4">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex flex-col justify-between w-full">
        <div>
          <p className="text-sm text-gray-500">{source}</p>
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{timeAgo}</p>
       
        <Link
                  to={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Read more
                </Link>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
