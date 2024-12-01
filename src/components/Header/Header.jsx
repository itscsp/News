import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SearchForm from "./SearchForm";
import Navbar from "./Navbar";
import NewsSourceFilter from "./NewsSourceFilter";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className=" bg-white">
      <div className="header-wrapper flex justify-between items-center py-4 px-4 gap-5">
        <div className="header-brand">
          <h1 className="text-4xl fw-500">News</h1>
        </div>
        <div className="header-search flex justify-end items-center gap-2 md:w-full">
          <div className="w-full">
            <SearchForm
              divClass={"hidden sm:block w-full"}
              btnClass={"sm:hidden"}
            />
          </div>
          <div className="header-btn-wrapper ">
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              class="text-blue-700 w-full hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 w-36 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
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
