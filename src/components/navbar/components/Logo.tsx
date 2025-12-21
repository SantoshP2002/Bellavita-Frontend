import type React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <img
        className="w-full h-13"
        src="/assets/images/download.png"
        alt="Logo bellavita"
      />
    </div>
  );
};

export default Logo;

{
  /* <img src="/logo.png" alt="Logo" className="h-8 w-8" />; */
}
