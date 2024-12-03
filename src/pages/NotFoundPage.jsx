import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4">Oops! The page you’re looking for doesn’t exist.</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded hover:bg-blue-600 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
