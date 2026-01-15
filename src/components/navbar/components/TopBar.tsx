import { useState } from "react";
import { categoryIconMap, navMapData } from "../../../constants";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const isHomePage = location.pathname === "/";
  return (
    <div>
      {/* mobile category nav */}
      {!isHomePage && (
        <div className="md:hidden flex gap-4 overflow-x-auto px-4 py-1 scrollbar-hide">
          {navMapData.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                setActiveCategory(item.value);
                navigate(`/products?category=${item.value}`);
              }}
              className={`flex items-center justify-center gap-2 whitespace-nowrap uppercase border-2 text-xs font-medium px-6 py-2 rounded cursor-pointer
${
  activeCategory === item.value
    ? "bg-black text-white dark:bg-white dark:text-black"
    : "bg-gray-100 text-gray-900 dark:bg-black dark:text-white"
}`}
            >
              {categoryIconMap[item.value] && categoryIconMap[item.value]}
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBar;
