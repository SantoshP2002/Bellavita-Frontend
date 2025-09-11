import { MdErrorOutline } from "react-icons/md";
import type { ISelectProps } from "../types";

const CategorySelect = ({
  label = "Category",
  register,
  name,
  error = "",
  options,
  className = "",
  containerClassName = "",
}: ISelectProps) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
      <div className="relative h-10 lg:h-12">
        {/* LABEL START */}
        {label && (
          <label
            htmlFor={name}
            className="text-[10px] lg:text-xs text-black bg-white absolute top-0 left-3 transform -translate-y-1/2 border border-black/10 leading-none px-1 md:px-2 py-0.5 rounded cursor-pointer"
          >
            {label}
          </label>
        )}
        {/* LABEL END */}
        {/* SELECT START*/}
        <select
          {...register}
          name={name}
          id={name}
          className={`w-full h-full border border-black/10 bg-white rounded-lg text-sm p-3 text-black cursor-pointer outline-none ${className}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {/* SELECT END*/}
      {/* ERROR */}
      {error && (
        <p className="w-full text-start flex gap-1 items-center text-[11px] leading-tight text-red-500">
          <MdErrorOutline className="w-3 h-3 md:w-4 md:h-4 fill-red-500" />
          <span className="leading-none">{error}</span>
        </p>
      )}
    </div>
  );
};

export default CategorySelect;
