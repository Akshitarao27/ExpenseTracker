import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl">

      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800">
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300 cursor-pointer"
            >
            <svg
               className="w-4 h-4"
               aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 14 14"
            >
            <path
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
            </svg>
            </button>

          </div>
          <div className="px-6 py-5">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Modal;