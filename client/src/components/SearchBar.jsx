import React, { useState } from "react";
import { callChatGPT } from "../service.js";
import { isValidDir } from "../service.js";



export function SearchBar({userFolders, setUserFolders}) {
  const handleSearch = async (folderName, e) => {
    e.preventDefault();
    try {
      const response = await isValidDir(folderName); 
      if (response.result) {
        setUserFolders([...userFolders, folderName]);
      } else {
        console.log('Invalid directory'); // TODO: Implement actual alert
      }
    } catch (error) {
      console.error('Error checking directory:', error);
    }
    
    // Resetting the search input
    document.getElementById('default-search').value = ''; // Fixing method name case
    setInputPath('');
  };
  
    
  //Useful for future queries where i show similar folders
  const [inputPath, setInputPath] = useState('');

  return (
    <form className="m-3 mb-0 mx-auto w-full" onSubmit={(e) => handleSearch(document.getElementById('default-search').value, e)}>
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative mx-3">
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm 
          text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Enter folder path here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const folderPath = e.target.value;
              handleSearch(folderPath, e);
            }
          }}
          onChange={(event) => setInputPath(event.target.value)}
          required
        />
        <button
          type="submit"
          className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium 
          text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 
          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Folder
        </button>
        
      </div>
    </form>
  );
}
