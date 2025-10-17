import { useState } from "react";
import type { ISelect } from "../types";
import { MdErrorOutline } from "react-icons/md";

const Select = ({
  label = "",
  className = "",
  error = "",
  containerClassName = "",
  icons,
  selectProps,
}: ISelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (value: string) => {
    setSelected(value);
    selectProps?.onChange?.(value);
    setIsOpen(false);
  };

  return (
    <div
      className={`w-full flex flex-col gap-1.5 relative ${containerClassName}`}
    >
      {label && <span className="text-xs text-black mb-1">{label}</span>}

      {/* Select box */}
      <div
        className={`relative border border-gray-300 rounded-lg p-2 flex justify-between items-center cursor-pointer bg-white ${className}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex-1 text-sm text-gray-700">
          {selected
            ? selectProps?.options.find((opt) => opt.value === selected)?.name
            : selectProps?.placeholder || "Select"}
        </div>

        {icons?.right && (
          <span
            onClick={icons.right.onClick}
            className="flex justify-center items-center cursor-pointer"
          >
            {icons.right.icon}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && selectProps?.options.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg z-50 mt-1 overflow-hidden shadow-md">
          {selectProps.options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selected === opt.value ? "bg-gray-200 font-medium" : ""
              }`}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="w-full text-start flex gap-1 items-center text-[11px] text-red-500 mt-1">
          <MdErrorOutline className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Select;
