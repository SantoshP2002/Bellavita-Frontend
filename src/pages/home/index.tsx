import { useState, useEffect } from "react";

const images = [
  "https://bellavitaorganic.com/cdn/shop/files/Summer-Banner-1920x720.webp?v=1745321335&width=1920",
  "https://bellavitaorganic.com/cdn/shop/articles/Perfect_Perfume_Gift_Sets_for_Any_Occasion.jpg?v=1684929262&width=1500",
  "https://bellavitaorganic.com/cdn/shop/files/Offer-Banner-2-UPB.webp?v=1727436765&width=1920",
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-10">
      <div className="mt-10">
        {/* Carousel */}
        <div className="relative overflow-hidden h-[400px] rounded-2xl shadow-lg">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                index === current
                  ? "opacity-100"
                  : "opacity-0 absolute top-0 left-0"
              }`}
            />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2 mb-6">
          {" "}
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                index === current ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Header */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <h1 className="text-2xl font-bold text-black">BESTSELLER</h1>
        <span className="text-gray-400">|</span>
        <h1 className="text-2xl font-semibold text-gray-500">NEW ARRIVALS</h1>
      </div>

      {/* Card Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image Section */}
          <div className="relative h-72 w-full bg-gray-100">
            <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded">
              Bestseller
            </span>

            <img
              src="https://bellavitaorganic.com/cdn/shop/files/front_2.jpg?v=1736851564&width=500"
              alt="Product Image"
              className="w-full h-full object-contain p-4"
            />

            <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              34% OFF
            </span>
          </div>

          {/* Details */}
          <div className="p-4">
            <p className="text-xs text-gray-500 font-medium">
              GIFT SET FOR MAN
            </p>

            <h2 className="text-sm mt-1 font-semibold text-gray-800">
              Luxury Perfume Gift Set For Men - 4 x 20ml
            </h2>

            <div className="flex items-center text-yellow-500 text-sm mt-2">
              ⭐⭐⭐⭐☆ <span className="text-gray-600 ml-1">(120)</span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <p className="text-lg font-bold text-black">₹564.00</p>
              <p className="text-sm text-gray-400 line-through">₹849.00</p>
            </div>

            <button className="mt-4 w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
