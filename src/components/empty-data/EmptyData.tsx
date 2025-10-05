import type { JSX } from "react";
import { GoContainer } from "react-icons/go";

interface EmptyDataProps {
  content: string | JSX.Element;
  className?: string;
}
const EmptyData = ({ className = "", content = "" }: EmptyDataProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-4 ${className}`}
    >
      <GoContainer className="w-12 h-12" />
      <h3 className="text-center text-lg text-shadow-sm font-medium">
        {content}
      </h3>
    </div>
  );
};

export default EmptyData;
