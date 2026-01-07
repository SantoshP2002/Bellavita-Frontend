import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps {
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "content">;
  icons?: {
    left?: ReactNode;
    right?: ReactNode;
  };
  className?: string;
  content: string | ReactNode;
  pattern?: "primary" | "secondary" | "tertiary" | "outline";
}

export const Button = ({
  buttonProps,
  icons,
  content,
  pattern = "primary",
  className = "",
}: ButtonProps) => {
  const buttonCss = () => {
    if (pattern === "primary") {
      return "";
    } else if (pattern === "secondary") {
      return "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition duration-300";
    } else if (pattern === "tertiary") {
      return "bg-gray-400 hover:bg-green-700 text-white font-semibold text-sm rounded-lg transition duration-300";
    } else if (pattern === "outline") {
      return "border border-black text-black relative overflow-hidden transition-all duration-300 hover:text-black";
    } else {
      return "";
    }
  };

  const LeftIcon = icons?.left;
  const RightIcon = icons?.right;

  return (
    <button
      {...buttonProps}
      {...(!buttonProps?.disabled &&
        buttonProps?.onClick && { onClick: buttonProps?.onClick })}
      className={`w-full flex items-center justify-center gap-1 py-2 px-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 group ${buttonCss()} ${
        buttonProps?.className ?? ""
      } ${className}`}
    >
      {/* Animated black background from bottom to top */}
      {pattern === "outline" && (
        <span className="absolute inset-0 -z-10 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
      )}

      {LeftIcon && LeftIcon}
      <span>{content}</span>
      {RightIcon && RightIcon}
    </button>
  );
};
