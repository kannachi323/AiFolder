import React, { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './styles/FileTree.css'

export default function FileTree({ node }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded); // Toggle the expanded state
  };

  return (
    <ul className="file-tree">
      <li>
        {node.children.length > 0 ? (
          <div className="file-container">
            <button onClick={handleClick} className="file-tree-button">
              {expanded ? (
                <FolderOpenIcon className="file-icon" />
              ) : (
                <FolderIcon className="file-icon" />
              )}
              {node.label}
            </button>
            {expanded && (
              <ul className="nested-list">
                {node.children.map((childNode, index) => (
                  <FileTree key={index} node={childNode} />
                ))}
              </ul>
            )}
          </div>
        ) : (
          <button className="file-tree-button">
            <InsertDriveFileIcon className="file-icon" /> {node.label}
          </button> // Render leaf nodes directly with a file icon
        )}
      </li>
    </ul>
  );
}
