import React, { useState } from "react";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiFolderAddLine } from "react-icons/ri";

export default function FolderSelector() {
  const folders = ["Desktop", "Downloads", "Pictures", "Music", "Videos"];
  const [folderActive, setFolderActive] = useState('');
  const [defaultSelected, setDefaultSelected] = useState(true);

  const toggleDefaultSelected = () => {
    setDefaultSelected(!defaultSelected);
  };

  return (
    <div className="min-w-[20%] m-5 mb-0 p-2 rounded-md border-solid border-2 flex flex-col items-center overflow-y-scroll overflow-x-hidden
    border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white
    [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full 
    [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-600
    [&::-webkit-scrollbar]:w-2">
      <FolderItems 
        folders={folders} 
        defaultSelected={defaultSelected} 
        setFolderActive={setFolderActive} 
        folderActive={folderActive} 
      />
      <DropZone />
      <DefaultCheckBox 
        defaultSelected={defaultSelected} 
        toggleDefaultSelected={toggleDefaultSelected} 
      />
    </div>
  );
}

function FolderItems({ folders, defaultSelected, folderActive, setFolderActive }) {
  function handleFolderActive(folderName) {
    setFolderActive(folderName);
  }

  return (
    <>
      {folders.length === 0 ? (
        <p className="text-gray-500">No folders available</p>
      ) : (
        folders.map((folderName, index) =>
          defaultSelected && (
            <button
              className={`overflow-hidden m-2 mt-0 flex w-[100px] flex-col items-center rounded-md
                p-2 ease-in animate-in slide-in-from-top-full hover:bg-slate-500 text-lg focus:outline-none focus:ring-4 focus:ring-gray-600 ${
                  folderActive === folderName ? "bg-slate-500" : ""
                }`}
              key={index}
              onClick={() => setFolderActive(folderName)}
            >
              {folderName}
            </button>
          )
        )
      )}
    </>
  );
}

function DefaultCheckBox({ defaultSelected, toggleDefaultSelected }) {
  return (
    <div className="flex flex-row items-center justify-center mb-2">
      {defaultSelected ? (
        <IoMdCheckbox 
          className="text-2xl cursor-pointer" 
          onClick={toggleDefaultSelected} 
        />
      ) : (
        <MdCheckBoxOutlineBlank 
          className="text-2xl cursor-pointer" 
          onClick={toggleDefaultSelected} 
        />
      )}
      <b className="p-2 pl-0.5 text-lg">Default</b>
    </div>
  );
}


function DropZone() {
  return (
    <button
      className="
        overflow-hidden m-2 mt-0 flex flex-row items-center justify-center 
        w-24 h-24 rounded-md p-4 bg-gray-600 
        ease-in animate-in slide-in-from-top-full hover:bg-gray-500
      "
      onClick={getAnyDirectory}
    >
      <RiFolderAddLine className="text-3xl" />
    </button>
  );
}

async function getAnyDirectory() {
  try {
    const dirHandle = await window.showDirectoryPicker();
    console.log(dirHandle);
  } catch (err) {
    console.error(err);
  }
}

export async function getHomeDirectory() {
  try {
    const dirHandle = await window.showDirectoryPicker();
    return dirHandle;
  } catch (err) {
    console.error('Error selecting directory:', err);
  }
}
