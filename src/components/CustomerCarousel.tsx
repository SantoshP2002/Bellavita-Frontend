import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { customers } from "../constants";

const CustomerCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === customers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? customers.length - 1 : prev - 1));
  };

  return (
    <div className="w-full sm:py-3 px-4 sm:px-8 md:px-16 text-center overflow-hidden dark:bg-black dark:text-white">
      {/* Title */}
      <h2 className="text-base sm:text-xl md:text-2xl mb-2 tracking-wide">
        WHAT OUR CUSTOMERS HAVE TO SAY
      </h2>
      {/* NEEDLE LINE */}
      <span className="mx-auto block h-[2px] w-[90%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />
      {/* Carousel */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <BsArrowLeft
          onClick={prevSlide}
          className="size-4 lg:size-6 sm:flex absolute left-2 md:left-10 dark:text-white"
        />

        {/* Images */}
        <div className="relative flex items-center justify-center w-full sm:w-[85%] md:w-[60%] h-32 sm:h-48 md:h-60">
          {customers.map((customer, index) => {
            const position =
              (index - current + customers.length) % customers.length;

            let className =
              "absolute rounded-full overflow-hidden transition-all duration-500";

            if (position === 0) {
              className += " scale-125 z-20";
            } else if (position === 1) {
              className +=
                " scale-105 opacity-50 translate-x-[90px] sm:translate-x-[140px] md:translate-x-[200px]";
            } else if (position === customers.length - 1) {
              className +=
                " scale-105 opacity-50 -translate-x-[90px] sm:-translate-x-[140px] md:-translate-x-[200px]";
            } else {
              className += " opacity-0 scale-75";
            }

            return (
              <div key={customer.id} className={className}>
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <BsArrowRight
          onClick={nextSlide}
          className="size-4 lg:size-6 sm:flex absolute right-2 md:right-10 dark:text-white"
        />
      </div>
      {/* Review */}
      <div className="mt-6 sm:mt-10 max-w-xl mx-auto px-2">
        <div className="flex justify-center mb-2 sm:mb-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <FaStar
                key={i}
                className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5"
              />
            ))}
        </div>

        <p className="text-gray-700 text-xs sm:text-base leading-relaxed">
          “{customers[current].review}”
        </p>

        <p className="mt-2 sm:mt-3 text-gray-500 italic font-semibold text-sm sm:text-base">
          - {customers[current].name}
        </p>
      </div>
    </div>
  );
};

export default CustomerCarousel;
