import type React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      {/* DESKTOP LOGO */}
      <img
        className="hidden md:block h-13"
        src="/assets/images/download.png"
        alt="Logo bellavita"
      />

      {/* MOBILE LOGO */}
      <img
        className="block md:hidden h-15 cursor-pointer"
        src="https://t4.ftcdn.net/jpg/13/06/18/43/240_F_1306184377_YCytm1yWub6o610ECqPinPxo54hX0vKJ.jpg"
        alt="Logo bellavita mobile"
      />
    </div>
  );
};

export default Logo;

{
  /* <img src="/logo.png" alt="Logo" className="h-8 w-8" />; */
}
