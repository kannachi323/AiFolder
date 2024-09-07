import React, { useState, useCallback, useEffect } from "react";
import { buildJsonFileTree } from "../service.js";
import FolderSelector from "../components/FolderSelector.jsx";
import Tree from "../components/Tree.jsx";
import LoadingRing from "../components/LoadingRing.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import { PlaygroundButton } from "../components/Playground.jsx";
import { createTempFolderAndCopyFiles, buildPrompt, callChatGPT } from "../service.js";
import { getItem, setItem, getUserKeys } from "../db.js";
import { FaMagic } from "react-icons/fa";
import { ShelfIcon, ProfileIcon, SettingsIcon } from "../components/IconControls.jsx";

export default function MainPage() {
  const [defaultFolders, setDefaultFolders] = useState([
    "C:/Users/mtcco/Desktop",
    "C:/Users/mtcco/Downloads",
    "C:/Users/mtcco/Pictures",
    "C:/Users/mtcco/Music",
    "C:/Users/mtcco/Videos",
  ]);
  const [userFolders, setUserFolders] = useState([]);
  const [folderActive, setFolderActive] = useState('');
  const [defaultSelected, setDefaultSelected] = useState(true);
  const [fileTreeNodes, setFileTreeNodes] = useState([]);
  const [loading, setLoading] = useState(false);

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
        const newUserFolders = Array.from(new Set([...userFolders, ...userKeys]));
        setUserFolders(newUserFolders);
      } catch (error) {
        console.error("Failed to fetch user keys:", error);
      }
    };

    fetchUserKeys(); // Call the async function
  }, []);

  return (
    <>
      {loading ? (
        <LoadingRing loading={loading} setLoading={setLoading} />
      ) : (
        <>
          <div className="flex flex-row w-screen overflow-hidden">
            <div className="w-[25vw] h-[12vh] flex flex-row justify-evenly items-center">
              <ShelfIcon />
              <SettingsIcon />
              <ProfileIcon />
            </div>
            <div className="w-[75vw] h-[12vh] flex flex-col justify-center items-center">
              <SearchBar userFolders={userFolders} setUserFolders={setUserFolders}/>
            </div>
          </div>
          <div className="flex flex-row border-t-2 mt-1 pt-2 h-[87vh] overflow-hidden">
            <div className="text-white flex flex-col justify-start w-[25vw] overflow-y-auto overflow-x-hidden pr-4">
              <FolderSelector folderProps={folderProps} />
            </div>
            <div className="p-3 w-[75vw] overflow-auto">
              <Tree node={fileTreeNodes[0]} />
              <div className="fixed bottom-0 right-0 flex flex-row justify-end items-end m-5">
              <button
                className="text-white hover:bg-slate-500 rounded-lg border-2 p-2 m-1 inline-flex justify-between items-center"
                onClick={async () => {
                  try {
                    setLoading(true);
                    const prompt = buildPrompt(fileTreeNodes[0]);
                    
                    const result = await callChatGPT(prompt);
                    console.log(result);
                    
                    await createTempFolderAndCopyFiles(folderActive, result);

                    const newNodes = [await buildJsonFileTree(folderActive)];
                    
                    if (newNodes) {
                      console.log("this is: ", newNodes);
                      setFileTreeNodes(newNodes);
                      setItem(folderActive, newNodes);
                    }
                  } catch (error) {
                    console.error('Error:', error);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                  <FaMagic className="text-2xl mr-2" />
                  Organize
                  
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
