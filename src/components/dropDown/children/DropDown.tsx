import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import type { TDropdown } from "../../../types";
import useOutsideClick from "../../../hooks/useOutSideClick";
import { RiArrowDropDownLine } from "react-icons/ri";

const Dropdown = ({
  title,
  icons,
  children,
  className = "",
  closeOnOptionClick = false,
  closeOnOutsideClick = false,
  isAbsolute = false,
  showShadow = false,
  isRounded = false,
  options = [],
  defaultOpen = false,
}: TDropdown) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useOutsideClick<HTMLDivElement>(
    () => (isOpen ? setIsOpen(false) : null),
    { enabled: closeOnOutsideClick }
  );

  useEffect(() => {
    if (!containerRef.current) return;
    if (isOpen) {
      containerRef.current.style.maxHeight = `${containerRef.current.scrollHeight}px`;
      containerRef.current.style.opacity = "1";
    } else {
      containerRef.current.style.maxHeight = "0px";
      containerRef.current.style.opacity = "0";
    }
  }, [isOpen, options]);
  return (
    <div
      className={`w-full flex flex-col items-start cursor-pointer ${
        isAbsolute ? "relative" : "static"
      } ${className}`}
      ref={ref}
    >
      <button
        className="flex items-center justify-between gap-2 w-full p-3 text-left transition-colors duration-300 bg-primary-inverted group"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 [&>span]:transition-all [&>span]:duration-300 [&>span]:flex [&>span]:items-center [&>span]:justify-center [&>span]:text-sm [&>span]:sm:text-base [&>span]:text-primary">
          {icons?.left && <span>{icons.left}</span>}
          <span className="font-medium whitespace-nowrap">{title}</span>
          {icons?.right && <span>{icons.right}</span>}
        </div>
        <RiArrowDropDownLine
          className={`w-5 h-5 transition-transform duration-300 ease-in-out stroke-primary ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        ref={containerRef}
        className={`transition-all duration-500 ease-in-out overflow-hidden opacity-0 w-full max-h-0 bg-primary-inverted [&>*]:py-2 [&>*]:px-3 ${
          isAbsolute ? "absolute top-full inset-x-0 mt-2 z-10" : ""
        } ${
          showShadow
            ? "shadow-[var(--primary-8)_0px_4px_16px,_var(--primary-10)_0px_8px_32px]"
            : ""
        } ${isRounded ? "rounded-lg" : ""}`}
      >
        {isValidElement(children)
          ? cloneElement(children, {
              onSelect: () => {
                if (closeOnOptionClick) setIsOpen(false);
              },
            })
          : children}
      </div>
    </div>
  );
};

export default Dropdown;
