import React from 'react';

const PreferenceButton = ({ 
  item, 
  selected, 
  onSelect, 
  getLabel = (item) => item, 
  getKey = (item) => item 
}) => {
  return (
    <button
      key={getKey(item)}
      onClick={() => onSelect(getKey(item))}
      className={`px-2 py-1 text-sm rounded-lg transition-colors  capitalize ${
        selected === getKey(item)
          ? "bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
      }`}
    >
      {getLabel(item)}
    </button>
  );
};

export default PreferenceButton;