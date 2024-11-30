import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SearchForm from "./SearchForm";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="px-4 bg-white">
      <div className="header-wrapper flex justify-between items-center py-4">
        <div className="header-brand">
          <h1 className="text-4xl fw-500">News</h1>
        </div>
        <div className="header-search flex justify-end items-center gap-2 md:w-full">
          <div className="w-full">

          <SearchForm />
          </div>
        <div className="header-btn-wrapper ">
        <button  onClick={() => setIsModalOpen(true)} type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Customize</button>
        <Modal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Simple React Modal"
      >
        <p>This is a simple modal created using React.</p>
        <p>It renders within the normal component hierarchy.</p>
      </Modal>
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
