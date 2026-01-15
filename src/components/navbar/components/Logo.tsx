import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/">
    {/* DESKTOP LOGO */}
    <img
      className="hidden md:block dark:hidden h-10"
      src="/assets/images/download.png"
      alt="Logo bellavita"
    />
    {/* DARK MODE IMAGE LAPTOP */}
    <img
      className="hidden dark:md:block h-10"
      src="./assets/images/ChatGPT Image Jan 15, 2026, 05_16_08 PM.png"
      alt="Logo bellavita"
    />
    {/* MOBILE LOGO LIGHT MODE*/}
    <img
      className="block md:hidden dark:hidden h-10 cursor-pointer"
      src="https://t4.ftcdn.net/jpg/13/06/18/43/240_F_1306184377_YCytm1yWub6o610ECqPinPxo54hX0vKJ.jpg"
      alt="Logo bellavita mobile"
    />
    {/* MOBILE LOGO DARK MODE  */}
    <img
      className="hidden dark:block md:hidden dark:md:hidden h-10 cursor-pointer"
      src="/assets/images/Mobile Dark Mode.png"
      alt="Logo bellavita mobile"
    />
  </Link>
);

export default Logo;
