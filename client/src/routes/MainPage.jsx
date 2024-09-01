import React, { useState, useCallback } from "react";
import FolderSelector from "../components/FolderSelector.jsx";
import Tree from "../components/Tree.jsx";
import { SearchBar } from "../components/AssortedBars.jsx";
import { PlaygroundButton } from "../components/Playground.jsx";
import { buildJsonFileTree } from "../service.js";

export default function MainPage() {
  const [folders, setFolders] = useState(
      ["C:/Users/mtcco/Desktop", "C:/Users/mtcco/Downloads", "C:/Users/mtcco/Pictures", "C:/Users/mtcco/Music", "C:/Users/mtcco/Videos"]);
  const [folderActive, setFolderActive] = useState('');
  const [defaultSelected, setDefaultSelected] = useState(true);
  const [fileTreeNodes, setFileTreeNodes] = useState([require('../default.json')]);

  const folderProps = {
    folders,
    setFolders,
    folderActive,
    setFolderActive,
    defaultSelected,
    setDefaultSelected,
    setFileTreeNodes,
  };

  function createDatabase() {
    const request = window.indexedDB.open('Folders', 1);
    request.onsuccess = (e) => {
      db = request.result
    }
  }
  
  return (
    <div className="h-screen mb-0 overflow-hidden">
      <SearchBar folders={folders} setFolders={setFolders}/>
      <div className="flex flex-row justify-center mt-2 h-[80%] w-screen overflow-x-hidden">
        <FolderSelector folderProps={folderProps} />
        
        <div className="min-w-[77vw] mt-5 mr-5 p-5
          border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white
          border-2 rounded-md overflow-y-scroll
          [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full 
          [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-600 
          [&::-webkit-scrollbar]:w-2">
          <Tree node={fileTreeNodes[0]}/>
        </div>
      </div>
    </div>
  );
}
