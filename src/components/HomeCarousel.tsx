import { useEffect, useState } from "react";

const images = [
  "https://bellavitaorganic.com/cdn/shop/files/Summer-Banner-1920x720.webp?v=1745321335&width=1920",
  "https://bellavitaorganic.com/cdn/shop/articles/Perfect_Perfume_Gift_Sets_for_Any_Occasion.jpg?v=1684929262&width=1500",
  "https://bellavitaorganic.com/cdn/shop/files/Offer-Banner-2-UPB.webp?v=1727436765&width=1920",
];

const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
    
    
  return (
    <div>
      <div className="mt-10 relative overflow-hidden h-[400px] rounded-2xl shadow-lg">
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
          
      {/* Content Header */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <h1 className="text-2xl font-bold text-black">BESTSELLER</h1>
        <span className="text-gray-400">|</span>
        <h1 className="text-2xl font-semibold text-gray-500">NEW ARRIVALS</h1>
      </div>
    </div>
  );
};

export default HomeCarousel;
