import { useEffect, useState } from "react";

const HomeCarousel = ({
  images,
  mobileImages,
  needDots,
}: {
  images: string[]; // desktop images
  mobileImages?: string[]; // mobile images
  needDots?: boolean;
}) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // <768px = mobile
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const activeImages = isMobile && mobileImages?.length ? mobileImages : images;

  useEffect(() => {
    if (activeImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeImages.length]);

  return (
    <div>
      <div className="mt-5 relative overflow-hidden h-full">
        {activeImages.map((img, index) => (
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
      {needDots && activeImages.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {activeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                index === current ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeCarousel;
