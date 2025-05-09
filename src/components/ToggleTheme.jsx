import { IoSunny } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import useThemeStore from "../store/theme";

const ToggleTheme = ({ className }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div onClick={toggleTheme} className={`cursor-pointer ${className}`}>
      {theme === "dark" ? <IoSunny /> : <FaRegMoon />}
    </div>
  );
};

export default ToggleTheme;
