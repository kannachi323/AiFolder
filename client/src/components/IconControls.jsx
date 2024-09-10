import React, { useState } from 'react';
import { VscThreeBars } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { useOutsideClick } from '../hooks/useOutsideClick.jsx';
import { useNavigate } from 'react-router-dom';

export function ShelfIcon() {
  const { isOpen, setIsOpen, dropdownRef } = useOutsideClick(false); // Start with closed dropdown
  
  return (
    <>
      {isOpen &&
        <div
          ref={dropdownRef}
          id="dropdown"
          className="absolute top-[10vh] left-[2vw] bg-slate-400 text-white shadow-lg rounded-lg p-4 w-[25vw] m-0 z-20"
        >
          <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left" onClick={() => setIsOpen(!isOpen)}>
            Duplicate Image Filtering
          </button>
          <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left" onClick={() => setIsOpen(!isOpen)}>
            Playground
          </button>
          <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left" onClick={() => setIsOpen(!isOpen)}>
            gmail-yt-dlp
          </button>
        </div>
      }
      
        <VscThreeBars
          className="text-5xl m-4 text-white hover:text-slate-400 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
    </>
  );
}

export function SettingsIcon() {
  const { isOpen, setIsOpen, dropdownRef } = useOutsideClick(false);
  return (
    <>
      {isOpen &&
        <div
          ref={dropdownRef}
          id="dropdown"
          className="absolute top-[10vh] left-[10vw] bg-slate-400 text-white shadow-lg rounded-lg p-4 w-[25vw] m-0 z-20"
        >
          <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left" onClick={() => setIsOpen(!isOpen)}>
            Duplicate Image Filtering
          </button>
          <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left" onClick={() => setIsOpen(!isOpen)}>
            Playground
          </button>
          <button className="flex items-center p-2 hover:bg-slate-600 w-full text-left" onClick={() => setIsOpen(!isOpen)}>
            gmail-yt-dlp
          </button>
        </div>
      }
      <IoMdSettings className="text-5xl m-4 text-white hover:text-slate-400 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
      />
    </>
  );
}

export function ProfileIcon() {
  const verified = false;
  const path = verified ? '/user/profile' : '/user/login';

  const navigate = useNavigate();
    return (
        <CgProfile className="text-5xl m-4 text-white hover:text-slate-400 cursor-pointer"
          onClick={() => navigate(`${path}`)}
        />
    );
}

