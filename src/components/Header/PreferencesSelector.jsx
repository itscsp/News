import React, { useState, useEffect } from 'react';

const PreferencesSelector = () => {
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: [],
  });

  const options = {
    sources: ['Source 1', 'Source 2', 'Source 3'],
    categories: ['Category 1', 'Category 2', 'Category 3'],
    authors: ['Author 1', 'Author 2', 'Author 3'],
  };

  // Load preferences from localStorage when the component mounts
  useEffect(() => {
    const savedPreferences = localStorage.getItem('preferences');
    if (savedPreferences) {
        try {
            setPreferences(JSON.parse(savedPreferences));
            console.log(preferences)
        } catch (error) {
            console.error('Failed to parse preferences from localStorage:', error);
        }
    }
}, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('preferences', JSON.stringify(preferences));
      console.log('Saved preferences to localStorage:', preferences);
    }, 500); // Debounce updates by 500ms
    // return () => clearTimeout(timeout);
  }, [preferences]);
  

  const handleChange = (type, value) => {
    setPreferences((prev) => {
      const currentValues = prev[type];
      return {
        ...prev,
        [type]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Select Your Preferences</h2>

      {/* Sources */}
      <div>
        <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">Sources</h3>
        <div className="flex flex-wrap gap-3">
          {options.sources.map((source) => (
            <label
              key={source}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200"
            >
              <input
                type="checkbox"
                value={source}
                checked={preferences.sources.includes(source)}
                onChange={() => handleChange('sources', source)}
                className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>{source}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">Categories</h3>
        <div className="flex flex-wrap gap-3">
          {options.categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200"
            >
              <input
                type="checkbox"
                value={category}
                checked={preferences.categories.includes(category)}
                onChange={() => handleChange('categories', category)}
                className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Authors */}
      <div>
        <h3 className="mb-2 font-medium text-gray-600 dark:text-gray-300">Authors</h3>
        <div className="flex flex-wrap gap-3">
          {options.authors.map((author) => (
            <label
              key={author}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200"
            >
              <input
                type="checkbox"
                value={author}
                checked={preferences.authors.includes(author)}
                onChange={() => handleChange('authors', author)}
                className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>{author}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreferencesSelector;
