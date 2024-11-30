import React, { useState, useRef, useCallback } from "react";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import { IoSearchSharp } from "react-icons/io5";

const SearchForm = ({ divClass = "", btnClass = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef(null);

  const fetchNewsArticles = useCallback(async (query) => {
    try {
      // Use encodeURIComponent to safely handle special characters in the query
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&searchIn=title,description,content&language=en&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error("Error fetching the news:", error);
      return [];
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Safely get input value and trim
    const query = inputRef.current ? inputRef.current.value.trim() : "";

    // Prevent multiple searches or empty queries
    if (!query || isModalOpen) return;

    setIsModalOpen(true);
    setSearchQuery(query);
    setIsLoading(true);

    try {
      const articles = await fetchNewsArticles(query);
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
            <IoSearchSharp  className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            required
          />
        </div>
        <button
          type="submit"
          className={`${btnClass} p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          <IoSearchSharp className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={searchCloseHandler}
        title={`Search Query: "${searchQuery}"`}
      >
        <h2 className="text-2xl font-medium">Result:</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader text="Searching..." />
          </div>
        ) : searchResult.length > 0 ? (
          searchResult.map((item, index) => (
            <div key={index} className="my-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p>No results found for your query.</p>
        )}
      </Modal>
    </>
  );
};

export default SearchForm;
