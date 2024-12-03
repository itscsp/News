import React from "react";
import {CATEGORY, COUNTRIES} from '../../utils/helpers.js';
import PreferenceButton from './PreferenceButton.jsx'
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader.jsx'
const PreferencesModal = ({
  isOpen,
  onClose,
  selectedPreferences,
  setSelectedPreferences,
  sources,
  visibleCount,
  handleShowMore,
  handleSave,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customize Your Preference"
      maxWidth="max-w-4xl"
    >
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-gray-600 dark:text-gray-300">
            Select Option
          </h2>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handleSave}
          >
            Save Preferences
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-2 md:gap-5">
          <div className="py-2 md:py-4">
            <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">
              Category
            </h3>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {CATEGORY.map((category) => (
                <PreferenceButton
                  key={category.id}
                  item={category.id}
                  selected={selectedPreferences.category}
                  onSelect={(category) =>
                    setSelectedPreferences((prev) => ({ ...prev, category }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="pt-2 pb-4 md:py-4">
            <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">
              Country
            </h3>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {COUNTRIES.map((country) => (
                <PreferenceButton
                  key={country.code}
                  item={country}
                  selected={selectedPreferences.country}
                  onSelect={(country) =>
                    setSelectedPreferences((prev) => ({ ...prev, country }))
                  }
                  getKey={(country) => country.name}
                  getLabel={(country) => country.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">
            Source
          </h3>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {sources.slice(0, visibleCount).map((source) => (
              <PreferenceButton
                key={source.id}
                item={source}
                selected={selectedPreferences.source}
                onSelect={(source) =>
                  setSelectedPreferences((prev) => ({ ...prev, source }))
                }
                getKey={(source) => source.id}
                getLabel={(source) => source.name}
              />
            ))}
            {sources.length === 0 && <Loader text="Loading Source..." />}
            {sources.length > 10 && (
              <button
                onClick={handleShowMore}
                className="px-2 py-1 text-sm font-semibold hover:text-white rounded-lg hover:bg-blue-700"
              >
                {visibleCount === 20 ? "Show More" : "Show Less"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreferencesModal;
