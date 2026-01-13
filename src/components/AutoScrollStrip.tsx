import React, { useRef, useEffect } from "react";
import { images } from "../constants";

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
      className="w-full overflow-hidden whitespace-nowrap relative"
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
