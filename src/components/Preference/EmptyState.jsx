const EmptyState = ({ openPreferences }) => (
    <div className="text-center text-gray-500 mt-10">
      <p className="mb-2">Please choose your preferences to see news articles.</p>
      <button
        onClick={openPreferences}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Preferences
      </button>
    </div>
  );
  
  export default EmptyState;
  