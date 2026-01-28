import type { ChangeEvent } from "react";
import type { IInput } from "../types";
import { MdErrorOutline } from "react-icons/md";

const Input = ({
  label = "",
  register,
  className = "",
  error = "",
  containerClassName = "",
  icons,
  inputProps,
}: IInput) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    inputProps?.onChange?.(event);
    register?.onChange?.(event);
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
      <div className="relative h-10 lg:h-12">
        {label && (
          <label
            htmlFor={inputProps.name}
            className="text-[10px] lg:text-xs dark:bg-black dark:text-gray-300 dark:border-gray-300 text-black bg-white absolute top-0 left-3 transform -translate-y-1/2 border border-black/10 leading-none px-1 md:px-2 py-0.5 rounded cursor-pointer"
          >
            {label}
          </label>
        )}
        <div
          className={`w-full h-full flex items-center gap-1 border border-black/10 bg-white rounded-lg overflow-hidden ${className}`}
        >
          {/* Left Icon */}
          {icons?.left?.icon && (
            <span
              onClick={icons.left.onClick}
              className="h-full flex justify-center items-center cursor-pointer p-2"
            >
              {icons.left.icon}
            </span>
          )}
          {/* Input */}
          <input
            aria-autocomplete="none"
            {...register}
            {...inputProps}
            id={inputProps.name}
            disabled={inputProps?.readOnly}
            onChange={handleChange}
            onWheel={(event) =>
              inputProps?.type === "number" ? event.currentTarget.blur() : null
            }
            className={`flex-1 w-full h-full outline-none border-none focus:outline-none focus:border-none bg-transparent font-normal text-sm p-3 dark:text-white dark:placeholder:text-white/50 text-black placeholder:text-black/50 placeholder:text-sm autofill-effect line-clamp-1 ${
              icons?.left?.icon && !icons?.right?.icon
                ? "pl-0"
                : !icons?.left?.icon && icons?.right?.icon
                  ? "pr-0"
                  : icons?.left?.text
                    ? "pl-2"
                    : ""
            } ${
              inputProps?.type === "number"
                ? "number-input-mouse-control-none"
                : ""
            } ${inputProps?.className ?? ""}`}
          />
          {/* Right Icon */}
          {icons?.right?.icon && (
            <span
              onClick={icons.right.onClick}
              className="h-full flex justify-center items-center cursor-pointer p-2"
            >
              {icons.right.icon}
            </span>
          )}
        </div>
      </div>

      {!inputProps?.readOnly && error && (
        <p
          className={`w-full text-start flex gap-1 items-center text-[11px] leading-tight text-red-500`}
        >
          <MdErrorOutline className="w-3 h-3 md:w-4 md:h-4 fill-red-500" />
          <span className="leading-none">{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;
