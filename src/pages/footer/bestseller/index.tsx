import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { bestsellerLinks } from "../../../constants";
import { useNavigate } from "react-router-dom";
import type { SectionType } from "../../../types";
import { useState } from "react";

const BestSellerSection = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<SectionType>(null);

  const toggleSection = (section: Exclude<SectionType, null>) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <div className="order-2 border-b border-gray-500 pb-4 md:border-none">
      <div
        className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
        onClick={() => toggleSection("bestseller")}
      >
        <h2 className="dark:text-white text-shadow-lg pb-2 md:pb-0 mb-0 md:mb-6 md:border-none">
          BESTSELLER
        </h2>
        <span className="md:hidden text-lg flex items-center">
          {openSection === "bestseller" ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      <ul
        className={`space-y-2 mt-2 text-sm dark:text-white overflow-hidden transition-all duration-300 ${
          openSection === "bestseller" || window.innerWidth >= 768
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {bestsellerLinks.map((item) => (
          <li
            key={item.slug}
            onClick={() => navigate(`/${item.slug}`)}
            className="relative block w-fit cursor-pointer dark:text-white
            after:content-['']
            after:absolute after:left-0 after:-bottom-0
            after:h-[1px] after:w-full after:bg-gray-400
            after:scale-x-0 after:origin-right
            after:transition-transform after:duration-300
            hover:after:scale-x-100 hover:after:origin-left"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestSellerSection;
