import { useEffect, useRef, useState } from "react";
import usdFlag from "../../assets/img/usd_flag.png";
import iranFlag from "../../assets/img/iran_flag.png";

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
        className="w-full p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none cursor-pointer"
      />
      {open && (
        <div className="absolute top-full mt-1 w-full border rounded-md bg-white z-10">
          <ul>
            <li
              onClick={() => handleSelect("USD")}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center">
                <img className="w-[2rem]" src={usdFlag} alt="flag"/>
                USD
              </div>
            </li>
            <li
              onClick={() => handleSelect("IRR")}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center">
                <img className="w-[2rem]" src={iranFlag} alt="flag" />
                IRR
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
