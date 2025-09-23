import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
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
      return "";
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
      {LeftIcon && LeftIcon}
      <span>{content}</span>
      {RightIcon && RightIcon}
    </button>
  );
};
