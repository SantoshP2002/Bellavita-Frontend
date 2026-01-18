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
      return `bg-white text-black border-2 border-black shadow-[4px_4px_0_0_#000] transition-all duration-200 relative overflow-hidden hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000] dark:bg-black dark:text-white dark:border-white dark:shadow-[4px_4px_0_0_#fff]`;
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
