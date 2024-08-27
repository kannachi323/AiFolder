import React from "react";
import FolderSelector from "./components/FolderSelector.jsx";
import Tree from "./components/Tree.jsx";
import SearchEngine from "./components/SearchBar.jsx";

const nodes = [
  {
    name: "matt",
    children: [
      {
        name: "john",
        children: [
          {
            name: "sara",
            children: [
              {
                name: "kevin",
                children: [],
              },
              {
                name: "amelia",
                children: [],
              },
            ],
          },
          {
            name: "luke",
            children: [
              {
                name: "jake",
                children: [
                  {
                    name: "lily",
                    children: [],
                  },
                  {
                    name: "tom",
                    children: [],
                  },
                ],
              },
              {
                name: "steve",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "anna",
        children: [
          {
            name: "mike",
            children: [
              {
                name: "chris",
                children: [
                  {
                    name: "nina",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            name: "sophie",
            children: [
              {
                name: "oscar",
                children: [
                  {
                    name: "ellie",
                    children: [],
                  },
                ],
              },
              {
                name: "lucas",
                children: [
                  {
                    name: "emma",
                    children: [],
                  },
                  {
                    name: "mia",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "james",
    children: [
      {
        name: "maria",
        children: [
          {
            name: "victor",
            children: [
              {
                name: "nancy",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "henry",
        children: [
          {
            name: "lucy",
            children: [
              {
                name: "ethan",
                children: [
                  {
                    name: "zoe",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];


function App() {
  return (
    <div className="overflow-hidden mb-0 bg-[#232b2b] h-screen">
      <SearchEngine></SearchEngine>
      
      <div className="flex flex-row mt-0 h-screen w-screen">
        <FolderSelector></FolderSelector>
        <div className="min-w-[80vw] max-h-full m-5 ml-0 mb-10 p-5 pb-20
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
