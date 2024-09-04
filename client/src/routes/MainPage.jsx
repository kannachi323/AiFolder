import React, { useState, useCallback, useEffect } from "react";
import FolderSelector from "../components/FolderSelector.jsx";
import Tree from "../components/Tree.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import { PlaygroundButton } from "../components/Playground.jsx";
import { buildJsonFileTree, buildPrompt, callChatGPT } from "../service.js";
import { getItem, setItem, getUserKeys } from "../db.js";
import { FaMagic } from "react-icons/fa";


export default function MainPage() {
  const [defaultFolders, setDefaultFolders] = useState(
      ["C:/Users/mtcco/Desktop", "C:/Users/mtcco/Downloads", "C:/Users/mtcco/Pictures", "C:/Users/mtcco/Music", "C:/Users/mtcco/Videos"]);
  const [userFolders, setUserFolders] = useState([]);
  const [folderActive, setFolderActive] = useState('');
  const [defaultSelected, setDefaultSelected] = useState(true);
  const [fileTreeNodes, setFileTreeNodes] = useState([]);

  const folderProps = {
    userFolders,
    setUserFolders,
    defaultFolders,
    setDefaultFolders,
    folderActive,
    setFolderActive,
    defaultSelected,
    setDefaultSelected,
    setFileTreeNodes,
  };

  useEffect(() => {
    const fetchUserKeys = async () => {
      try {
        const userKeys = await getUserKeys(defaultFolders);
        console.log("User keys:", userKeys);
        const newUserFolders = Array.from(new Set([...userFolders, ...userKeys]));
        setUserFolders(newUserFolders);
      } catch (error) {
        console.error("Failed to fetch user keys:", error);
      }
    };
  
    fetchUserKeys(); // Call the async function
  }, []);
  
  return (
    <div className="h-screen mb-0 overflow-hidden">
      <SearchBar userFolders={userFolders} setUserFolders={setUserFolders}/>
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
          <button 
            onClick={() => {
              const prompt = buildPrompt(fileTreeNodes[0]);
              callChatGPT(prompt);
            }}
            className="inline-flex justify-center align-middle absolute bottom-10 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
            <FaMagic className="flex mr-2 justify-center" />
            Organize
          </button>
        </div>
      </div>
    </div>
  );
}
