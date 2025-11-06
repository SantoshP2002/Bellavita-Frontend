import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const customers = [
  {
    id: 1,
    name: "Sannna Thakur",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-1.webp?v=1725617641&width=150",
    review:
      "Bellavita perfumes are simply amazing! The fragrance lasts all day and feels truly luxurious. Totally worth every penny.",
  },
  {
    id: 2,
    name: "Pulkit Bangia",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-3.webp?v=1725617640&width=150",
    review:
      "Affordable yet premium quality! I love how every product feels natural and smells incredible. Bellavita never disappoints!",
  },
  {
    id: 3,
    name: "Avantika",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-4.webp?v=1725617641&width=150",
    review:
      "I’ve tried many brands but Bellavita is my favorite. Their fragrances are elegant, long-lasting, and cruelty-free!",
  },
  {
    id: 4,
    name: "Gunveet",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-5.webp?v=1725617641&width=150",
    review:
      "Best perfumes ever! I get so many compliments every time I wear them. Bellavita has my heart forever!",
  },
  {
    id: 5,
    name: "Simran Narang",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-2.webp?v=1725617641&width=150",
    review:
      "Bellavita products define luxury with simplicity. Every scent is unique and perfectly balanced. Highly recommend!",
  },
];

const CustomerCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === customers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? customers.length - 1 : prev - 1));
  };

  return (
    <div className="w-full py-12 px-4 md:px-16 mt-4 text-center overflow-hidden">
      {/* Title */}
      <h2 className="text-xl md:text-2xl mb- tracking-wide">
        WHAT OUR CUSTOMERS HAVE TO SAY
      </h2>

      {/* Carousel Section */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-10 p-2 bg-white rounded-full shadow hover:scale-105 transition"
        >
          <BsArrowLeft className="w-5 h-5" />
        </button>

        {/* Images Container */}
        <div className="relative flex items-center justify-center w-[90%] sm:w-[70%] md:w-[50%] h-48 sm:h-60">
          {customers.map((customer, index) => {
            const position =
              (index - current + customers.length) % customers.length;

            let className =
              "absolute rounded-full overflow-hidden shadow-md border-2 border-white transition-all duration-500 ease-in-out";

            // 👉 Adjusted spacing by increasing translate-x values
            if (position === 0) {
              className += " scale-125 opacity-100 z-20 translate-x-0";
            } else if (position === 1) {
              className += " scale-110 opacity-80 translate-x-[180px] z-10"; // right-1
            } else if (position === 2) {
              className += " scale-95 opacity-60 translate-x-[360px] z-0"; // right-2
            } else if (position === customers.length - 1) {
              className += " scale-110 opacity-80 -translate-x-[180px] z-10"; // left-1
            } else if (position === customers.length - 2) {
              className += " scale-95 opacity-60 -translate-x-[360px] z-0"; // left-2
            } else {
              className += " opacity-0 scale-75";
            }

            return (
              <div key={customer.id} className={className}>
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-10 p-2 bg-white rounded-full shadow hover:scale-105 transition"
        >
          <BsArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Review Info */}
      <div className="mt-10 max-w-xl mx-auto">
        <div className="flex justify-center mb-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <FaStar
                key={i}
                className="w-5 h-5 text-yellow-500 fill-yellow-500"
              />
            ))}
        </div>

        <p className="text-gray-700 text-sm sm:text-base  leading-relaxed">
          “{customers[current].review}”
        </p>
        <p className="mt-3 text-gray-500 italic font-semibold">
          - {customers[current].name}
        </p>
      </div>
    </div>
  );
};

export default CustomerCarousel;
