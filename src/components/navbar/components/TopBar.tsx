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
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto px-4 py-1 scrollbar-hide">
            {navMapData.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  setActiveCategory(item.value);
                  navigate(`/products?category=${item.value}`);
                }}
                className={`flex items-center gap-2 whitespace-nowrap text-xs font-medium px-6 py-2 rounded border cursor-pointer ${
                  activeCategory === item.value
                    ? "bg-gray-900 text-white border-black"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } `}
              >
                {categoryIconMap[item.name] && categoryIconMap[item.name]}{" "}
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
