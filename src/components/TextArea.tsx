import type { ChangeEvent } from "react";
import { MdErrorOutline } from "react-icons/md";
import type { ITextArea } from "../types";

const Textarea = ({
  label = "",
  register,
  className = "",
  error = "",
  containerClassName = "",
  textareaProps,
}: ITextArea) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    textareaProps?.onChange?.(event);
    register?.onChange?.(event);
  };

  return (
    <div className={`relative w-full flex flex-col ${containerClassName}`}>
      <div className="relative">
        {label && (
          <label
            htmlFor={textareaProps.name}
            className="absolute -top-2 left-3 z-10 text-[10px] lg:text-xs bg-white dark:bg-black text-black dark:text-gray-300 px-2 py-0.5 border border-black/10 dark:border-gray-300 rounded pointer-events-none"
          >
            {label}
          </label>
        )}
        <div
          className={`relative min-h-[200px] rounded-lg bg-white dark:bg-black ${className}`}
        >
          {/* Textarea */}
          <textarea
            {...register}
            {...textareaProps}
            onChange={handleChange}
            className={`w-full h-full resize-y outline-none rounded-lg border border-slate-300 dark:border-gray-600 border-b-4 border-r-4 bg-transparent p-3 pt-5 text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-200 ${textareaProps?.className ?? ""}`}
          />

          {/* Right Icon */}
        </div>
      </div>

      {!textareaProps?.readOnly && error && (
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

export default Textarea;
