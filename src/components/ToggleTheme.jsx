import { IoSunny } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import useThemeStore from "../store/theme";

const ToggleTheme = ({ className }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div onClick={toggleTheme} className={`cursor-pointer ${className}`}>
      <p className="w-5 h-5 flex items-center justify-center">{theme === "dark" ? "D" : "L"}</p>
      {/* {theme === "dark" ? <IoSunny /> : <FaRegMoon />} */}
    </div>
  );
};

export default ToggleTheme;
