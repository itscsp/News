import React, { useState, useRef, useCallback } from "react";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import { IoSearchSharp } from "react-icons/io5";
import NewsCard from "../UI/NewsCard";
import { DATAERANGES, formatTimeAgo } from "../../utils/helpers";
import { searchArticles } from "../../api/SearchAPI";


const SearchForm = ({ divClass = "", btnClass = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("last7Days");
  const inputRef = useRef(null);

  const dateRanges = DATAERANGES; // utils/helpers.js

  const submitHandler = async (e) => {
    e.preventDefault();

    // Safely get input value and trim
    const query = inputRef.current ? inputRef.current.value.trim() : "";

    // Prevent multiple searches or empty queries
    if (!query || isModalOpen) return;

    setIsModalOpen(true);
    setSearchQuery(query);
    setIsLoading(true);

    // Get the selected date range
    const selectedRange = dateRanges.find(
      (range) => range.key === selectedDateRange
    );
    const { start, end } = selectedRange.getDates();

    try {

      const articles = await searchArticles(query, start, end);
      setSearchResult(articles);
    } finally {
      setIsLoading(false);
    }
  };

  const searchCloseHandler = () => {
    setIsModalOpen(false);
    setSearchQuery("");
    setSearchResult([]);

    // Clear input field safely
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDateRangeSelect = async (rangeKey) => {
    setSelectedDateRange(rangeKey);
    setIsLoading(true);
    
    const selectedRange = dateRanges.find((range) => range.key === rangeKey);
    const { start, end } = selectedRange.getDates();

    try {
      const articles = await searchArticles(searchQuery, start, end);
      setSearchResult(articles);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex items-center max-w-xl mx-auto"
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className={`relative ${divClass}`}>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearchSharp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search news..."
            required
          />
        </div>
        <button
          type="submit"
          className="text-blue-700 ml-2 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          <IoSearchSharp className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={searchCloseHandler}
        title={`Search Query: "${searchQuery}"`}
        customClassName="items-start"
        maxWidth="max-w-4xl"
      >
        {/* Date Range Buttons */}
        <div className="flex space-x-2 mb-4 w-full overflow-x-auto">
          {dateRanges.map((range) => (
            <button
              key={range.key}
              onClick={() => handleDateRangeSelect(range.key)}
              className={`
                px-3 py-1 text-sm rounded transition-colors whitespace-nowrap
                ${selectedDateRange === range.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"}
              `}
            >
              {range.label}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-medium mb-4">Result:</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader text="Searching..." />
          </div>
        ) : searchResult.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResult.map((item, index) => (
              <NewsCard
              key={index}
              source={item.source['name']}
                title={item.title}
                description={item.description}
                timeAgo={formatTimeAgo(item.publishedAt)}
                url={item.url}
                image={
                  item.urlToImage
                    ? item.urlToImage
                    : "https://via.placeholder.com/150"
                }
              />
            ))}
          </div>
        ) : (
          <p>No results found for your query.</p>
        )}
      </Modal>
    </>
  );
};

export default SearchForm;
