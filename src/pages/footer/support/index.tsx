import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { SectionType } from "../../../types";
import { useState } from "react";

const SupportSection = () => {
  const [openSection, setOpenSection] = useState<SectionType>(null);

  const toggleSection = (section: Exclude<SectionType, null>) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <div className="order-4 border-b border-gray-500 pb-4 md:border-none">
      <div
        className="flex justify-between items-center md:block cursor-pointer md:cursor-default"
        onClick={() => toggleSection("support")}
      >
        <h2 className="text-white text-xs md:text-sm mb-2 md:mb-6 pb-2 md:border-none">
          SUPPORT
        </h2>
        <span className="md:hidden text-lg">
          {openSection === "support" ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      <ul
        className={`flex flex-col gap-2 mt-2 text-sm text-white overflow-hidden transition-all duration-300 ${
          openSection === "support" || window.innerWidth >= 768
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/aboutUs"
        >
          About Us
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/contactUs"
        >
          Contact Us
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/order-tracking"
        >
          Order Tracking
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/products"
        >
          All Products
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/faq"
        >
          FAQ
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/sitemap"
        >
          Sitemap
        </Link>
      </ul>
    </div>
  );
};

export default SupportSection;
