import { useState } from "react";
import type { SectionType } from "../../../types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const InformationSection = () => {
  const [openSection, setOpenSection] = useState<SectionType>(null);

  const toggleSection = (section: Exclude<SectionType, null>) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <div className="order-3 border-b border-gray-500 pb-4 md:border-none">
      <div
        className="flex justify-between items-center md:block cursor-pointer md:cursor-default"
        onClick={() => toggleSection("information")}
      >
        <h2 className="text-white text-xs md:text-sm mb-2 md:mb-6 pb-2 md:border-none">
          INFORMATION
        </h2>
        <span className="md:hidden text-lg">
          {openSection === "information" ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      <ul
        className={`flex flex-col gap-2 mt-2 text-sm text-white overflow-hidden transition-all duration-300 ${
          openSection === "information" || window.innerWidth >= 768
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
          to="/blogs"
        >
          Blogs
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/newsroom"
        >
          News Room
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/terms-and-condition"
        >
          Terms & Condition
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/privacy-policy"
        >
          Privacy Policy
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/refund-return"
        >
          Refund & Return
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/shipping-policy"
        >
          Shipping Policy
        </Link>
        <Link
          className="relative w-fit cursor-pointer text-white
                 after:content-['']
                 after:absolute after:left-0 after:-bottom-0
                 after:h-[1px] after:w-full after:bg-gray-400
                 after:scale-x-0 after:origin-right
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 hover:after:origin-left"
          to="/bulk-order"
        >
          Bulk Order - GST Invoice
        </Link>
      </ul>
    </div>
  );
};

export default InformationSection;
