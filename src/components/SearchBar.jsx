import React, { useState } from "react";

export default function SearchEngine() {
  const filters = Object.freeze({
    NAME: 0,
    DATE_MODIFIED: 1,
    TYPE: 2,
  });

  const [filterStates, setFilterStates] = useState([0, 0, 0]);

  return (
    <form className="m-3 mb-0 mx-auto max-w-md">
      <label
        for="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm 
          text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium 
          text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 
          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
