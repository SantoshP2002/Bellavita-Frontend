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

type SectionType = "bestseller" | "information" | "support" | "contact" | null;

const Footer = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<SectionType>(null);

  const toggleSection = (section: Exclude<SectionType, null>) => {
    setOpenSection(openSection === section ? null : section);
  };

   const handleGoogleLogin = () => {
     window.location.href = "http://localhost:8080/api/google";
   };

  return (
    <footer className="bg-[#434343] text-gray-300 mt-6">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-12 py-8 md:py-12 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* EXCLUSIVE Section */}
        <div className="order-1 md:order-5 border-b border-gray-500 pb-5 md:border-none">
          <h2 className="text-white text-base md:text-lg mb-3 md:mb-6 pb-2 md:border-none">
            EXCLUSIVE
          </h2>

          {/* Input + Icon container */}
          <div className="relative w-full">
            <Input
              inputProps={{ placeholder: "Enter Email Here..." }}
              className="p-3"
            />
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
            <h2 className="text-white text-base md:text-lg pb-2 md:pb-0 mb-0 md:mb-6 md:border-none">
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
            <h2 className="text-white text-base md:text-lg mb-2 md:mb-6 pb-2 md:border-none">
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
            <h2 className="text-white text-base md:text-lg mb-2 md:mb-6 pb-2 md:border-none">
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
            <h2 className="text-white text-base md:text-lg mb-2 md:mb-6 pb-2 md:border-none">
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

      {/* Scam Alert  */}
      <div className="border border-red-500 rounded-md p-4 md:p-5 max-w-full mx-20">
        <h3 className="text-red-400 font-semibold text-base md:text-lg mb-2">
          🚨 Scam Alert
        </h3>

        <h2 className="text-md text-white md:text-base mb-3">
          We have noticed a rise in fraudulent activities through calls, SMS,
          WhatsApp messages, emails, and other mediums.
        </h2>

        <h6 className="text-sm md:text-base mb-3">
          Please be aware that{" "}
          <span className="font-semibold text-xs text-white">
            BELLAVITA and its employees never ask for your financial details for
            contests or deals
          </span>{" "}
          outside our official platform. We also never request payments for any
          promotional activities through unauthorised channels.
        </h6>

        <p className="text-sm md:text-base mb-3">
          If you receive any such communication, stay cautious and reach out to
          us immediately at our{" "}
          <span className="font-semibold text-white text-xs">
            customer care number +91 9810154380
          </span>{" "}
          or email us at{" "}
          <span className="font-semibold underline text-xs text-white">
            shop@bellavitaorganic.com
          </span>
          .
        </p>

        <p className="text-sm md:text-base">
          If you suspect any scam, kindly{" "}
          <span className="font-semibold text-xs text-white">
            Department of Telecommunications (DoT)
          </span>
          .
        </p>

        <h5 className="mt-3 font-semibold">Stay safe!</h5>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
