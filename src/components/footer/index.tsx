import { useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaGoogle,
} from "react-icons/fa";
import Input from "../Input";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { bestsellerLinks } from "../../constants";
import { VITE_BACKEND_URI } from "../../env";

type SectionType = "bestseller" | "information" | "support" | "contact" | null;

const Footer = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<SectionType>(null);

  const toggleSection = (section: Exclude<SectionType, null>) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${VITE_BACKEND_URI}/api/google`;
  };

  return (
    <footer className="bg-[#434343] text-gray-300 dark:bg-black dark:text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-20 py-8 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* EXCLUSIVE Section */}
        <div className="order-1 md:order-5 border-b border-gray-500 pb-5 md:border-none">
          <h2 className="text-white text-xs md:text-sm mb-3 md:mb-6 pb-2 md:border-none">
            EXCLUSIVE
          </h2>

          {/* Input + Icon container */}
          <div className="relative w-full">
            <Input inputProps={{ placeholder: "Enter Email Here..." }} />
            <FaArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-md cursor-pointer" />
          </div>

          <p className="text-white text-sm mt-4 leading-relaxed">
            Sign up here to get the latest news, updates, and special offers
            delivered to your inbox.
          </p>
          <p className="text-white text-sm mt-3 leading-relaxed">
            Plus, you'll be the first to know about our discounts!
          </p>
        </div>

        {/* BESTSELLER Section */}
        <div className="order-2 border-b border-gray-500 pb-4 md:border-none">
          <div
            className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
            onClick={() => toggleSection("bestseller")}
          >
            <h2 className="text-white text-xs md:text-sm pb-2 md:pb-0 mb-0 md:mb-6 md:border-none">
              BESTSELLER
            </h2>
            <span className="md:hidden text-lg flex items-center">
              {openSection === "bestseller" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </span>
          </div>

          <ul
            className={`space-y-2 mt-2 text-sm text-white overflow-hidden transition-all duration-300 ${
              openSection === "bestseller" || window.innerWidth >= 768
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {bestsellerLinks.map((item) => (
              <li
                key={item.slug}
                onClick={() => navigate(`/${item.slug}`)}
                className="relative block w-fit cursor-pointer text-white
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

        {/* INFORMATION Section */}
        <div className="order-3 border-b border-gray-500 pb-4 md:border-none">
          <div
            className="flex justify-between items-center md:block cursor-pointer md:cursor-default"
            onClick={() => toggleSection("information")}
          >
            <h2 className="text-white text-xs md:text-sm mb-2 md:mb-6 pb-2 md:border-none">
              INFORMATION
            </h2>
            <span className="md:hidden text-lg">
              {openSection === "information" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
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

        {/* SUPPORT Section */}
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
              to="/all-products"
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

        {/* CONTACT US Section */}
        <div className="order-5 md:order-4 border-b border-gray-500 pb-4 md:border-none">
          <div
            className="flex justify-between items-center md:block cursor-pointer md:cursor-default"
            onClick={() => toggleSection("contact")}
          >
            <h2 className="text-white text-xs md:text-sm mb-2 md:mb-6 pb-2 md:border-none">
              CONTACT US
            </h2>
            <span className="md:hidden text-lg">
              {openSection === "contact" ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          <ul
            className={`space-y-2 mt-2 text-sm text-white overflow-hidden transition-all duration-300 ${
              openSection === "contact" || window.innerWidth >= 768
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <li>
              Office Location: Plot no. 417, Udyog Vihar Phase III, Gurgaon,
              Haryana, India
            </li>
            <li className="hover:text-indigo-400 cursor-pointer underline mt-4">
              Contact Us on WhatsApp
            </li>
            <li className="mt-3 hover:text-indigo-400 cursor-pointer">
              +91-9810154380
            </li>
            <li className="mt-3 hover:text-indigo-400 cursor-pointer">
              Timing: 10:00 AM to 7:00 PM, Monday to Sunday
            </li>
          </ul>

          <div className="flex space-x-6 mt-6 md:mt-8">
            {/* GOOGLE  */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 text-xl"
            >
              <FaGoogle
                className="text-red-500 hover:scale-150 transition"
                onClick={handleGoogleLogin}
              />
            </a>

            {/* TWITTER  */}
            <a
              href="https://x.com/Santosh13337724"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 text-xl"
            >
              <FaTwitter className="text-blue-500 hover:scale-150 transition" />
            </a>

            {/* INSTAGRAM  */}
            <a
              href="https://www.instagram.com/santoshpawar987/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 text-xl"
            >
              <FaInstagram className="text-pink-500 hover:scale-150 transition" />
            </a>

            {/* LINKEDIN  */}
            <a
              href="https://www.linkedin.com/in/santosh-pawar-2b1a642a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 text-xl"
            >
              <FaLinkedin className="text-blue-500 hover:scale-150 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* 🚨 Scam Alert */}
      <div className="border border-red-500 rounded-lg p-4 sm:p-5 md:p-6 mx-3 sm:mx-6 md:mx-20 my-6">
        <h3 className="text-red-500 font-semibold text-base sm:text-lg mb-2">
          🚨 Scam Alert
        </h3>

        <p className="text-sm sm:text-base text-gray-200 mb-3">
          We have noticed a rise in fraudulent activities through calls, SMS,
          WhatsApp messages, emails, and other mediums.
        </p>

        <p className="text-sm sm:text-base text-gray-200 mb-3">
          Please be aware that{" "}
          <span className="font-semibold text-white">
            BELLAVITA and its employees never ask for your financial details
          </span>{" "}
          for contests or deals outside our official platform. We also never
          request payments through unauthorised channels.
        </p>

        <p className="text-sm sm:text-base text-gray-200 mb-3">
          If you receive any such communication, stay cautious and contact us at{" "}
          <span className="font-semibold text-white block sm:inline">
            +91 9810154380
          </span>{" "}
          or email{" "}
          <span className="font-semibold underline text-white block sm:inline">
            shop@bellavitaorganic.com
          </span>
        </p>

        <p className="text-sm sm:text-base text-gray-200">
          If you suspect any scam, kindly report it to{" "}
          <span className="font-semibold text-white">
            the Department of Telecommunications (DoT)
          </span>
          .
        </p>

        <h5 className="mt-4 font-semibold text-white text-sm sm:text-base">
          Stay safe!
        </h5>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
