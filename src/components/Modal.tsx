import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="relative bg-gray-50 p-2 rounded-md shadow-lg w-6/12">
        <button
          className="absolute top-0 right-2 text-gray-600 hover:text-gray-700 text-4xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mt-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
