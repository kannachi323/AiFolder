import React, { useRef, useEffect } from 'react';

export default function FolderDropdown({ optionsListIndex, setOptionsListIndex, handleOptionClick }) {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOptionsListIndex(null);
    }
  };

  useEffect(() => {
    if (optionsListIndex !== null) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [optionsListIndex]);

  if (optionsListIndex === null) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-10 top-0 mt-10 w-32 bg-white rounded-md shadow-lg z-10"
    >
      <ul className="py-1">
        <li
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleOptionClick("Option 1")}
        >
          Option 1
        </li>
        <li
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleOptionClick("Option 2")}
        >
          Option 2
        </li>
        <li
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleOptionClick("Option 3")}
        >
          Option 3
        </li>
      </ul>
    </div>
  );
}