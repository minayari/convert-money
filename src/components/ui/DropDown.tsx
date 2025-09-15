import { useEffect, useRef, useState } from "react";
import usdFlagImage from "../../assets/img/usd_flag.png";
import iranFlagImage from "../../assets/img/iran_flag.png";

type TCurrency = "USD" | "IRR";

interface IInputDropDownProps {
  value: TCurrency;
  onChange: (value: TCurrency) => void;
}

export default function DropDown({ value, onChange }: IInputDropDownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (item: TCurrency) => {
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
        onChange={(e) => onChange(e.target.value as TCurrency)}
        onClick={() => setOpen(!open)}
        placeholder="chose..."
        className="w-full p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none cursor-pointer"
      />
      {open && (
        <div className="absolute top-full mt-1 w-full border border-gray-400 rounded-md bg-white z-10">
          <ul>
            <li
              onClick={() => handleSelect("USD")}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center">
                <img className="w-[2rem]" src={usdFlagImage} alt="flag" />
                USD
              </div>
            </li>
            <li
              onClick={() => handleSelect("IRR")}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              <div className="flex items-center">
                <img className="w-[2rem]" src={iranFlagImage} alt="flag" />
                IRR
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
