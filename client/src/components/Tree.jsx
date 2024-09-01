import React, { useState, useEffect } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";

export default function Tree({ node }) {
  const [expanded, setExpanded] = useState(false);


  return (
    <>
      {node.children && node.children.length > 0 ? (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex cursor-pointer items-center border-none bg-none py-1 text-lg text-white hover:text-blue-500"
          >
            {expanded ? <FaRegFolderOpen className="size-8 mr-2"/> : <FaRegFolder className="size-7 mr-2"/>} {node.id}
          </button>
          {expanded && (
            <ul className="mt-1 pl-5">
              {node.children.map((childNode) => (
                <Tree
                  key={childNode.id} // Use a unique key, ideally from your data
                  node={childNode}
                  
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <button 
            
            className="flex cursor-pointer items-center border-none bg-none py-2 text-lg text-white hover:text-blue-500">
            <CiFileOn className="size-7 mr-2"/> {node.id}
          </button>
        </div>
      )}
    </>
  );
}
