import React, { useRef, useEffect } from "react";

const images = [
  "https://bellavitaorganic.com/cdn/shop/files/HT_4a741228-3740-4f84-97bc-3c093ceec75a.jpg?height=80&v=1716360141",
  "https://bellavitaorganic.com/cdn/shop/files/Elle_480x_db18e8ef-2f25-4299-9c39-73af4c300969.jpg?height=80&v=1716878217",
  "https://bellavitaorganic.com/cdn/shop/files/Ani_480x_14446b4e-c91a-46df-a133-a95092fe484e.jpg?height=80&v=1716878217",
  "https://bellavitaorganic.com/cdn/shop/files/IDiva_480x_1617c636-c0ed-4ed2-bb06-36e1906728ff.jpg?height=80&v=1716878216",
  "https://bellavitaorganic.com/cdn/shop/files/Pinkvilla_480x_a664ac7e-bd4f-45ae-b43a-b5ce25e0b530.jpg?height=80&v=1716878216",
  "https://bellavitaorganic.com/cdn/shop/files/BW_460x460_dcd6c999-6863-4ea2-ae4a-5621f5a51507.png?height=80&v=1717310549",
];

const AutoScrollStrip: React.FC = () => {
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let isHovered = false;
    const scrollSpeed = 0.5; // smooth & stable speed
    let animationFrame: number;

    const scroll = () => {
      if (!isHovered) {
        strip.scrollLeft += scrollSpeed;
        if (strip.scrollLeft >= strip.scrollWidth / 2) {
          strip.scrollLeft = 0; // seamless loop reset
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    const handleMouseEnter = () => (isHovered = true);
    const handleMouseLeave = () => (isHovered = false);

    // Pause only on desktop
    if (window.innerWidth > 768) {
      strip.addEventListener("mouseenter", handleMouseEnter);
      strip.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      strip.removeEventListener("mouseenter", handleMouseEnter);
      strip.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={stripRef}
      className="w-full overflow-hidden whitespace-nowrap relative mt-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {/* ✅ Show only 6 images visually, double them internally for infinite scroll */}
      <div className="flex shrink-0 gap-16">
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className="w-28 sm:w-40 h-20 sm:h-24 mx-1 object-contain inline-block transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default AutoScrollStrip;
