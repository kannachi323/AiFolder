import { useState, useRef, useEffect } from 'react';

export function useOutsideClick(initialIsOpen = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Ensure the dropdown closes instead of toggling
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return { isOpen, setIsOpen, dropdownRef };
}