import { useEffect, useRef, useState } from "react";

type Currency = "USD" | "IRR";

interface InputDropDownProps {
  value: Currency;
  onChange: (value: Currency) => void;
}

export default function InputDropDown({ value, onChange }: InputDropDownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (item: Currency) => {
    onChange(item);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value as Currency)}
        onClick={() => setOpen(!open)}
        placeholder="chose..."
        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      />
      {open && (
        <div className="absolute top-full mt-1 w-full border rounded-md bg-white z-10">
          <ul>
            <li
              onClick={() => handleSelect("USD")}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              USD
            </li>
            <li
              onClick={() => handleSelect("IRR")}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              IRR
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
