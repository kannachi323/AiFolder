import React from "react";
import { useNavigate } from 'react-router-dom';
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { buildJsonFileTree, callChatGPT } from "../service.js";
import { getItem, setItem } from "../db.js";
export default function FolderSelector({ folderProps }) {

  const defaultCheckboxProps = {
    defaultSelected: folderProps.defaultSelected,
    setDefaultSelected: folderProps.setDefaultSelected,
  };
  
  return (
    <div className="min-w-[20%] m-5 mb-0 p-2 rounded-md border-solid border-2 flex flex-col items-center overflow-y-scroll overflow-x-hidden
      border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white
      [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full 
      [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-600
      [&::-webkit-scrollbar]:w-2">
      
      <FolderItems folderProps={folderProps} />
      <DefaultCheckBox {...defaultCheckboxProps} />
    </div>
  );
}

function FolderItems({ folderProps }) {
  const { userFolders, defaultSelected, defaultFolders, folderActive, setFolderActive, setFileTreeNodes } = folderProps;

  const handleFolderClick = async (folderName) => {
    
    let newNodes = await getItem(folderName);
    console.log(newNodes);
    if (newNodes) {
      console.log('hi');
      setFileTreeNodes(newNodes);
      
    }
    else {
      try {
        newNodes = [await buildJsonFileTree(folderName)];
        
        if (newNodes) {
          setFileTreeNodes(newNodes);
          setItem(folderName, newNodes);
        }
      } catch (error) {
        console.error('Error building file tree:', error);
      }
    }
    setFolderActive(folderName);
  };

  return (
    <>
      {(!defaultSelected && userFolders.length === 0) ? (
        <p className="text-gray-500">No folders available</p>
      ) : (
        <>
          {defaultSelected &&
            defaultFolders.map((folderName, index) => (
              <button
                className={`overflow-hidden m-2 mt-0 flex w-[100px] flex-col items-center rounded-md
                  p-2 ease-in animate-in slide-in-from-top-full hover:bg-slate-500 text-lg focus:outline-none focus:ring-4 focus:ring-gray-600 ${
                    folderActive === folderName ? "bg-slate-500" : ""
                  }`}
                key={`default-${index}`}
                onClick={() => handleFolderClick(folderName)}              
              >
                {folderName.substring(folderName.lastIndexOf("/") + 1)}
              </button>
            ))
          }
          {userFolders.map((folderName, index) => (
            <button
              className={`overflow-hidden m-2 mt-0 flex w-[100px] flex-col items-center rounded-md
                p-2 ease-in animate-in slide-in-from-top-full hover:bg-slate-500 text-lg focus:outline-none focus:ring-4 focus:ring-gray-600 ${
                  folderActive === folderName ? "bg-slate-500" : ""
                }`}
              key={`user-${index}`}
              onClick={() => handleFolderClick(folderName)}              
            >
              {folderName.substring(folderName.lastIndexOf("/") + 1)}
            </button>
          ))}
        </>
      )}
    </>
  );
}

function DefaultCheckBox({ defaultSelected, setDefaultSelected }) {
  return (
    <div className="flex flex-row items-center justify-center mb-2">
      {defaultSelected ? (
        <IoMdCheckbox 
          className="text-2xl cursor-pointer" 
          onClick={() => setDefaultSelected(!defaultSelected)}
        />
      ) : (
        <MdCheckBoxOutlineBlank 
          className="text-2xl cursor-pointer" 
          onClick={() => setDefaultSelected(!defaultSelected)}
        />
      )}
      <b className="p-2 pl-0.5 text-lg">Default</b>
    </div>
  );
}

