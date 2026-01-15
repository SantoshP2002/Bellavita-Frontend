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
    <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
      <div className="relative min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]">
        {label && (
          <label
            htmlFor={textareaProps.name}
            className="text-[10px] lg:text-xs dark:bg-black dark:text-gray-300 dark:border-gray-300 text-black bg-white absolute top-0 left-3 transform -translate-y-1/2 border border-black/10 leading-none px-1 md:px-2 py-0.5 rounded cursor-pointer"
          >
            {label}
          </label>
        )}
        <div
          className={`w-full h-full flex items-center gap-1 rounded-lg bg-white dark:bg-black dark:text-white  overflow-hidden ${className}`}
        >
          {/* Textarea */}
          <textarea
            aria-autocomplete="none"
            {...register}
            {...textareaProps}
            cols={textareaProps.cols ?? 4}
            id={textareaProps.id}
            disabled={textareaProps?.disabled}
            onChange={handleChange}
            className={`flex-1 w-full h-full outline-none mx-1 rounded-lg border border-slate-300 dark:border-gray-600 border-b-4 border-r-4 bg-transparent font-normal text-sm p-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-200 autofill-effect resize-none ${
              textareaProps?.className ?? ""
            }`}
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
