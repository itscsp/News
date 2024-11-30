import React, { useState, useRef } from 'react';
import Modal from '../Modal/Modal';

const SearchForm = ({ divClass, btnClass }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef(null); // useRef for the input field

  const submitHandler = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim(); // Get the value from the input
    if (query) {
      setSearchQuery(query);

      // Build the NewsAPI URL using the `q` parameter for searching
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${import.meta.env.VITE_API_KEY}`;

      // Fetch data from NewsAPI
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setSearchResult(data.articles || []); // Set search results
        })
        .catch((error) => {
          console.error('Error fetching the news:', error);
        });

      setIsModalOpen(true); // Open modal
    }
  };


  return (
    <>
      <form onSubmit={submitHandler} className="flex items-center max-w-xl mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className={`relative ${divClass}`}>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            ref={inputRef} // Attach the ref to the input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            required
          />
        </div>
        <button
          type="submit"
          className={`btnClass ${btnClass} p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Search Result: ${searchQuery}`} // Pass searchQuery to the title
      >
        <p>Your search query is: {searchQuery}</p>
      </Modal>
    </>
  );
};

export default SearchForm;
