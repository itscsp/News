import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Close the modal only if the click is on the overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick} // Attach click handler to the overlay
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start pt-4 justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[85vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;