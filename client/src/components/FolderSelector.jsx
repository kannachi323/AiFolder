import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { buildJsonFileTree, callChatGPT } from "../service.js";
import { getItem, setItem } from "../db.js";
import { MdAutoDelete } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi";
import { useOutsideClick } from "../hooks/useOutsideClick.jsx";



export default function FolderSelector({ folderProps }) {

  const defaultCheckboxProps = {
    defaultSelected: folderProps.defaultSelected,
    setDefaultSelected: folderProps.setDefaultSelected,
  };
  
  return (
    <>
      <FolderItems folderProps={folderProps} />
      <DefaultCheckBox {...defaultCheckboxProps} />
    </>
  );
}

function FolderItems({ folderProps }) {
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(null);
  const [optionsListIndex, setOptionsListIndex] = useState(null);
  const { isOpen, setIsOpen, dropdownRef } = useOutsideClick(false);

  const { userFolders, defaultSelected, defaultFolders, folderActive, setFolderActive, setFileTreeNodes } = folderProps;

  const handleFolderClick = async (folderName) => {
    let newNodes = await getItem(folderName);
    if (newNodes) {
      setFileTreeNodes(newNodes);
    } else {
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

  const handleOptionsClick = (index, folderName, e) => {
    e.stopPropagation();
    setOptionsListIndex(index);
    setFolderActive(folderName);
    setIsOpen(true);
  };

  return (
    <>
      {(!defaultSelected && userFolders.length === 0) ? (
        <p className="text-gray-500">No folders available</p>
      ) : (
        <>
          {defaultSelected &&
            defaultFolders.map((folderName, index) => (
              <div
                key={`default-${index}`}
                className="relative"
              >
              <button
                className={`overflow-hidden px-5 m-2 mt-0 flex w-full flex-row justify-between items-center rounded-md
                  p-2 ease-in animate-in slide-in-from-top-full hover:bg-slate-500 text-lg ${
                    folderActive === folderName ? "bg-slate-500" : ""
                  }`}
                onClick={() => handleFolderClick(folderName)}
                onMouseEnter={() => setHoveredButtonIndex(index)}
                onMouseLeave={() => setHoveredButtonIndex(null)}
              >
                {folderName.substring(folderName.lastIndexOf("/") + 1)}
                {hoveredButtonIndex === index && (
                  <PiDotsThreeCircleVerticalLight
                    id="item-options"
                    className="text-3xl cursor-pointer text-slate-700 hover:text-white"
                    onClick={(e) => handleOptionsClick(index, folderName, e)}
                  />
                )}
              </button>
              {optionsListIndex === index && isOpen && (
                <div
                  ref={dropdownRef}
                  className="fixed mt-2 left-[20%] w-48 bg-slate-400 rounded-lg shadow-lg z-30 p-1"
                  
                >
                  <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left">
                    <FaPencilAlt className="text-lg mr-2" />
                    Rename
                    
                  </button>
                  <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left">
                    <MdDelete className="text-lg mr-2" />
                    Delete
                  </button>
                  <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left">
                    <MdAutoDelete className="text-lg mr-2" />
                    Clear temp folders
                  </button>
                </div>
              )}
            </div>
          ))}
          {userFolders.map((folderName, index) => (
            <div
              key={`user-${index}`}
              className="relative" // Add relative positioning to the container
            >
              <button
                className={`overflow-hidden px-5 m-2 mt-0 flex w-full flex-row justify-between items-center rounded-md
                    p-2 ease-in animate-in slide-in-from-top-full hover:bg-slate-500 text-lg  ${
                  folderActive === folderName ? "bg-slate-500" : ""
                }`}
                onClick={() => handleFolderClick(folderName)}
                onMouseEnter={() => setHoveredButtonIndex(index + defaultFolders.length)}
                onMouseLeave={() => setHoveredButtonIndex(null)}
              >
                {folderName.substring(folderName.lastIndexOf("/") + 1)}
                {hoveredButtonIndex === index + defaultFolders.length && (
                  <PiDotsThreeCircleVerticalLight
                    id="item-options"
                    className="text-3xl cursor-pointer"
                    onClick={(e) => handleOptionsClick(index + defaultFolders.length, folderName, e)}
                  />
                )}
              </button>
              {optionsListIndex === index + defaultFolders.length && isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 w-48 bg-slate-400 rounded-md shadow-lg z-30"
                  style={{ top: "80%", left: "100%", transform: "translate(-50%, 0)" }}
                >
                  <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left">
                      <FaPencilAlt className="text-lg mr-2" />
                      Rename
                  </button>
                  <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left">
                    <MdDelete className="text-lg mr-2" />
                    Delete
                  </button>
                  <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left">
                    <MdAutoDelete className="text-lg mr-2" />
                    Clear temp folders
                  </button>
                </div>
              )}
            </div>
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

