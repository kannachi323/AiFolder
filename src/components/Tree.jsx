import React, { useState } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";

export default function Tree({ node }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded); // Toggle the expanded state
  };

  return (
    <>
      {node.children && node.children.length > 0 ? (
        <div>
          <button
            onClick={handleClick}
            className="flex cursor-pointer items-center border-none bg-none py-1 text-lg text-white hover:text-blue-500"
          >
            {expanded ? <FaRegFolderOpen className="size-8 mr-2"/> : <FaRegFolder class="size-7 mr-2"/>} {node.name}
          </button>
          {expanded && (
            <ul className="mt-1 pl-5">
              {node.children.map((childNode, index) => (
                <Tree key={index} node={childNode} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <button className="flex cursor-pointer items-center border-none bg-none py-2 text-lg text-white hover:text-blue-500">
            <CiFileOn className="size-7 mr-2"/> {node.name}
          </button>
        </div>
      )}
    </>
  );
}
