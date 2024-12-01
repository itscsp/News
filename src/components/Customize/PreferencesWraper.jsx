import React from "react";
import Modal from "../Modal/Modal";
import { CATEGORY, COUNTRIES } from "../../utils/helpers";

const PreferencesModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedCategory,
  setSelectedCategory,
  selectedCountry,
  setSelectedCountry,
  selectedSource,
  setSelectedSource,
  handleSave,
  sources,
}) => {

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Customize Your Preference"
      maxWidth="max-w-4xl"
    >
      <div>
        <h3>Select Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORY.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <h3>Select Country</h3>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country.code)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                selectedCountry === country.code
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>

        <h3>Select Source</h3>
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <button
              key={source.id}
              onClick={() => setSelectedSource(source.id)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                selectedSource === source.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {source.name}
            </button>
          ))}
        </div>

        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={handleSave}
        >
          Save Preferences
        </button>
      </div>
    </Modal>
  );
};

export default PreferencesModal;
