import React from "react";
import FolderSelector, { getHomeDirectory } from "./components/FolderSelector.jsx";
import Tree from "./components/Tree.jsx";
import { SearchBar } from "./components/AssortedBars.jsx";
import { PlaygroundButton } from "./components/Playground.jsx";

const nodes = require('./data.json');

function App() {

  return (
    <div className="h-screen mb-0 overflow-hidden">
      <SearchBar></SearchBar>
      <div className="flex flex-row justify-center mt-2 h-[80%] w-screen overflow-x-hidden">
        <FolderSelector></FolderSelector>
        
        <div className="min-w-[77vw] mt-5 mr-5 p-5
        border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white
          border-2 rounded-md overflow-y-scroll
          [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full 
          [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-600 
          [&::-webkit-scrollbar]:w-2">
          <Tree node={nodes[0]}></Tree>
        </div>
      
      </div>
    </div>
    
    
  );
}

export default App;
