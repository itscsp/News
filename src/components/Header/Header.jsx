import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SearchForm from "./SearchForm";
import Navbar from "./Navbar";
import NewsSourceFilter from "./NewsSourceFilter";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className=" bg-white">
      <div className="header-wrapper flex justify-between items-center py-4 px-4 gap-2 md:gap-5 flex-col sm:flex-row">
        <div className="header-brand">
          <h1 className="text-2xl md:text-4xl fw-500 bg-blue-700 text-white py-1 px-2.5 rounded cursor-pointer uppercase">News</h1>
        </div>
        <div className="header-search flex justify-end items-start sm:items-center flex-col sm:flex-row gap-2 w-full">
          <div className="w-full">
            <SearchForm
              divClass={"w-full"}
              btnClass={""}
            />
          </div>
          <div className="header-btn-wrapper w-full sm:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              class="text-blue-700 w-full sm:w-36  sm:block hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 w-36 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Filter By Source
            </button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Filter By News Sources"
              maxWidth="max-w-4xl"

            >
              <NewsSourceFilter />
            </Modal>
          </div>
        </div>
      </div>

      <Navbar />
    </header>
  );
};

export default Header;
