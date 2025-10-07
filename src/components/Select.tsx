import { useState } from "react";
import type { ISelect } from "../types";
import { MdErrorOutline } from "react-icons/md";

const Select = ({
  label = "",
  register,
  className = "",
  error = "",
  containerClassName = "",
  icons,
  options = [],
  selectProps,
  placeholder,
}: ISelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (value: string) => {
    setSelected(value);
    const event = {
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>;
    selectProps?.onChange?.(event);
    register?.onChange?.(event);
    setIsOpen(false);
  };

  return (
    <div
      className={`w-full flex flex-col gap-1.5 relative ${containerClassName}`}
    >
      <div className="relative h-10 lg:h-12">
        {label && (
          <label
            htmlFor={selectProps?.name}
            className="text-[10px] lg:text-xs text-black bg-white absolute top-0 left-3 transform -translate-y-1/2 border border-black/10 leading-none px-1 md:px-2 py-0.5 rounded cursor-pointer"
          >
            {label}
          </label>
        )}

        {/* ✅ Outline animation container */}
        <div
          className={`relative group w-full h-full flex items-center gap-1 border border-black text-black rounded overflow-hidden transition-all duration-300 hover:text-white cursor-pointer ${className}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="absolute inset-0 -z-10 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>

          {/* Left icon or text */}
          {icons?.left?.icon && (
            <span
              onClick={icons.left.onClick}
              className="h-full flex justify-center items-center cursor-pointer p-2 overflow-hidden"
            >
              {icons.left.icon}
            </span>
          )}

          {/* Selected text or placeholder */}
          <div className="flex-1 px-3 text-sm text-current line-clamp-1">
            {selected
              ? options.find((opt) => opt.value === selected)?.label
              : placeholder || "Select"}
          </div>

          {/* Right icon */}
          {icons?.right && (
            <span
              onClick={icons.right.onClick}
              className="h-full flex justify-center items-center cursor-pointer p-2 overflow-hidden"
            >
              {icons.right.icon}
            </span>
          )}
        </div>

        {/* ✅ Custom dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg z-50 overflow-hidden animate-dropdown">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`relative inline-block px-4 py-2 text-sm text-gray-700 cursor-pointer group transition ${
                  selected === opt.value ? "font-semibold" : ""
                }`}
              >
                <span className="relative">
                  {opt.label}
                  <span className="absolute left-0 bottom-0 h-[1.5px] bg-gray-700 transition-all duration-300 w-0 group-hover:w-full"></span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {!selectProps?.disabled && error && (
        <p className="w-full text-start flex gap-1 items-center text-[11px] leading-tight text-red-500">
          <MdErrorOutline className="w-3 h-3 md:w-4 md:h-4 fill-red-500" />
          <span className="leading-none">{error}</span>
        </p>
      )}
    </div>
  );
};

export default Select;
