import { FaArrowRight } from "react-icons/fa";
import Input from "../Input";

import InformationSection from "../../pages/footer/information";
import SupportSection from "../../pages/footer/support";
import ContactUsPage from "../../pages/footer/ContactUs";
import BestSellerSection from "../../pages/footer/bestseller";

const Footer = () => {
  return (
    <footer className="text-black dark:bg-black dark:text-white">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 sm:px-6 md:px-20 py-8 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* EXCLUSIVE Section */}
        <div className="order-1 md:order-5 border-b border-gray-500 pb-5 md:border-none">
          <h2 className="dark:text-white text-shadow-lg mb-3 md:mb-6 pb-2 md:border-none">
            EXCLUSIVE
          </h2>

          {/* Input + Icon container */}
          <div className="relative w-full">
            <Input
              label="Email"
              className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
              inputProps={{ placeholder: "Enter your email" }}
            />
            <FaArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-md cursor-pointer" />
          </div>

          <p className="dark:text-white text-sm mt-4 leading-relaxed">
            Sign up here to get the latest news, updates, and special offers
            delivered to your inbox.
          </p>
          <p className="dark:text-white text-sm mt-3 leading-relaxed">
            Plus, you'll be the first to know about our discounts!
          </p>
        </div>

        {/* BESTSELLER Section */}
        <BestSellerSection />

        {/* INFORMATION Section */}
        <InformationSection />

        {/* SUPPORT Section */}
        <SupportSection />

        {/* CONTACT US Section */}
        <ContactUsPage />
      </div>

      {/* 🚨 Scam Alert */}
      <div className="border border-red-500 rounded-lg p-4 sm:p-5 md:p-6 mx-3 sm:mx-6 md:mx-20 my-6">
        <h3 className="text-red-500 font-semibold text-base sm:text-lg mb-2">
          🚨 Scam Alert
        </h3>

        <p className="text-sm sm:text-base text-gray-600 mb-3">
          We have noticed a rise in fraudulent activities through calls, SMS,
          WhatsApp messages, emails, and other mediums.
        </p>

        <p className="text-sm sm:text-base text-gray-600 mb-3">
          Please be aware that{" "}
          <span className="font-semibold text-black dark:text-white ">
            BELLAVITA and its employees never ask for your financial details
          </span>{" "}
          for contests or deals outside our official platform. We also never
          request payments through unauthorised channels.
        </p>

        <p className="text-sm sm:text-base text-gray-600 mb-3">
          If you receive any such communication, stay cautious and contact us at{" "}
          <span className="font-semibold text-black dark:text-white block sm:inline">
            +91 9810154380
          </span>{" "}
          or email{" "}
          <span className="font-semibold underline text-black dark:text-white block sm:inline">
            shop@bellavitaorganic.com
          </span>
        </p>

        <p className="text-sm sm:text-base text-gray-600">
          If you suspect any scam, kindly report it to{" "}
          <span className="font-semibold text-black dark:text-white">
            the Department of Telecommunications (DoT).
          </span>
        </p>

        <h5 className="mt-4 font-semibold text-black dark:text-white text-sm sm:text-base">
          Stay safe!
        </h5>
      </div>

      {/* Bottom Section */}
      <span className="mx-auto block h-[2px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mt-20" />

      <div className="text-center py-4 text-sm text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
