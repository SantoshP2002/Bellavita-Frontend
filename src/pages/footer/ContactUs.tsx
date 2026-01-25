import {
  FaChevronDown,
  FaChevronUp,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import type { SectionType } from "../../types";
import { useState } from "react";
import { VITE_BACKEND_URI } from "../../env";

const ContactUsPage = () => {
  const [openSection, setOpenSection] = useState<SectionType>(null);

  const toggleSection = (section: Exclude<SectionType, null>) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${VITE_BACKEND_URI}/api/google`;
  };
  return (
    <div className="order-5 md:order-4 border-b border-gray-500 pb-4 md:border-none">
      <div
        className="flex justify-between items-center md:block cursor-pointer md:cursor-default"
        onClick={() => toggleSection("contact")}
      >
        <h2 className="dark:text-white text-shadow-lg mb-2 md:mb-6 pb-2 md:border-none">
          CONTACT US
        </h2>
        <span className="md:hidden text-lg">
          {openSection === "contact" ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      <ul
        className={`space-y-2 mt-2 text-sm dark:text-white overflow-hidden transition-all duration-300 ${
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
  );
};

export default ContactUsPage;
