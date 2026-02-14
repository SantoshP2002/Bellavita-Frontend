import { sitemapSections } from "../../../constants";
import { useEffect, useState } from "react";

const Sitemap = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 overflow-hidden px-2 sm:px-4 lg:px-8 py-12 lg:py-20">
      {/* Responsive Background Bubbles */}
      <div className="fixed inset-0 opacity-20 dark:opacity-10 pointer-events-none z-0">
        <div className="absolute top-20 left-5 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-sky-400/30 rounded-full animate-float blur-xl" />
        <div className="absolute top-1/2 right-5 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-blue-400/30 rounded-full animate-float-slow blur-xl" />
        <div className="absolute bottom-20 sm:bottom-32 left-10 w-20 h-20 sm:w-24 sm:h-24 bg-sky-500/20 rounded-full animate-float-med blur-xl" />
      </div>

      {/* RESPONSIVE HEADER */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-24 relative z-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-sky-500 via-blue-500 to-sky-700 bg-clip-text text-transparent leading-tight animate-fade-in-down">
          Sitemap
        </h1>
        <span className="mx-auto mt-4 sm:mt-6 block h-2 sm:h-[4px] w-20 sm:w-32 lg:w-40 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full animate-expand-width" />
      </div>

      {/* RESPONSIVE SKY BLUE ROOT */}
      <div className="flex justify-center mb-16 lg:mb-28 relative z-10 px-4">
        <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md animate-grow-in">
          {/* Responsive Trunk */}
          <div className="relative w-3 sm:w-4 md:w-6 h-28 sm:h-36 md:h-40 lg:h-52 bg-gradient-to-t from-slate-700 via-slate-600 to-slate-500 mx-auto rounded-xl shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-sky-600/20 before:to-transparent before:rounded-xl sm:rounded-2xl">
            <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-sky-500/50 rounded-full blur-sm animate-pulse" />
          </div>

          {/* Responsive Sky Blue Crown */}
          <div className="absolute top-20 sm:top-24 md:top-28 lg:top-32 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-44 lg:w-56 h-32 sm:h-40 md:h-44 lg:h-56 bg-gradient-to-br from-sky-400 via-blue-500 to-sky-600 rounded-2xl sm:rounded-3xl shadow-2xl lg:shadow-3xl border-4 sm:border-8 border-white/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white tracking-wide px-2 py-4 sm:py-0 animate-leaf-shake text-center sm:text-left">
            <span>Bellavita</span>
            <span className="sm:hidden block mt-1 text-sm">Website</span>
            <span className="hidden sm:block ml-1">Website</span>
          </div>
        </div>
      </div>

      {/* RESPONSIVE SKY BLUE BRANCH SYSTEM */}
      <div className="max-w-4xl lg:max-w-7xl mx-auto relative z-20 px-2 sm:px-4 lg:px-8">
        {/* Responsive Horizontal Main Branches */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 sm:mb-16 lg:mb-24 gap-4 sm:gap-0 px-2">
          {sitemapSections.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className="w-full sm:w-24 md:w-32 lg:w-48 h-1.5 sm:h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 rounded-full animate-branch-grow relative overflow-hidden mx-auto sm:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-l from-sky-600/40 animate-shimmer" />
            </div>
          ))}
        </div>

        {/* RESPONSIVE NODES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-24 px-2 sm:px-4">
          {sitemapSections.map((section, index) => (
            <div
              key={index}
              className={`group relative ${isAnimated ? `animate-leaf-fall-${index}` : ""}`}
            >
              {/* Responsive Vertical Branch */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 h-16 sm:h-20 md:h-24 lg:h-32 w-1 sm:w-1.5 bg-gradient-to-b from-sky-400 via-blue-500 to-sky-600 rounded-full shadow-lg" />

              {/* Responsive Branch Joint */}
              <div className="absolute left-1/2 -translate-x-1/2 top-12 sm:top-16 md:top-20 lg:top-24 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg md:shadow-xl border-2 sm:border-4 border-white/50 animate-bounce-slow" />

              {/* RESPONSIVE MAIN SKY BLUE LEAF NODE */}
              <div className="relative mx-auto w-32 sm:w-40 md:w-44 lg:w-52 h-32 sm:h-40 md:h-44 lg:h-52 group-hover:scale-105 sm:group-hover:scale-110 transition-all duration-500 lg:duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-500 to-sky-600 rounded-2xl sm:rounded-3xl shadow-2xl lg:shadow-3xl border-4 sm:border-6 border-white/60 backdrop-blur-xl transform rotate-1 sm:rotate-2 -skew-y-2 sm:-skew-y-3 group-hover:rotate-0 group-hover:skew-y-0" />
                <div className="relative w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white/30 backdrop-blur-xl sm:backdrop-blur-2xl shadow-xl sm:shadow-2xl border border-white/50 flex items-center justify-center">
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white drop-shadow-2xl text-center leading-tight tracking-wide px-2 bg-gradient-to-r from-white via-sky-100 to-blue-100 bg-clip-text">
                    {section.title}
                  </span>
                </div>
              </div>

              {/* RESPONSIVE SUB-BRANCHES */}
              <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-28 space-y-3 sm:space-y-4 px-2 sm:px-4">
                {/* Row 1 */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {section.links.slice(0, 2).map((link, i) => (
                    <LeafLink key={i} link={link} delay={i * 150} size="sm" />
                  ))}
                </div>
                {/* Row 2 */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {section.links.slice(2).map((link, i) => (
                    <LeafLink
                      key={i + 2}
                      link={link}
                      delay={(i + 2) * 150}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESPONSIVE SKY BLUE OVERVIEW */}
      <div className="mt-16 lg:mt-40 text-center px-4 sm:px-8 relative z-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 animate-fade-in-up">
          <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-sky-700 bg-clip-text text-transparent">
            🌟 Project Overview
          </span>
        </h2>
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mb-6 sm:mb-12 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              "Modern scalable e-commerce frontend",
              "Beauty, perfume & lifestyle products",
              "React + Tailwind CSS architecture",
              "Clean UI & smooth navigation",
              "Product listings & order tracking",
              "Production-ready code quality",
            ].map((item, i) => (
              <div
                key={i}
                className={`group p-4 sm:p-6 rounded-2xl lg:rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-xl lg:shadow-2xl hover:shadow-2xl lg:hover:shadow-3xl hover:-translate-y-2 lg:hover:-translate-y-4 transition-all duration-500 border border-sky-200/50 hover:border-sky-400 ${isAnimated ? `animate-delay-${i * 100}` : ""}`}
              >
                <div className="w-3 h-3 sm:w-4 md:w-5 sm:h-4 md:h-5 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex-shrink-0 shadow-lg mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-800 dark:text-gray-200 font-medium text-sm sm:text-base leading-relaxed group-hover:text-sky-700 text-center sm:text-left">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESPONSIVE SKY BLUE FOOTER */}
      <div className="mt-12 lg:mt-24 text-center relative z-20 px-4">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-sky-500/90 via-blue-500/90 to-sky-600/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 text-white font-semibold text-sm sm:text-base animate-float-slow max-w-full">
          <span className="text-lg sm:text-xl">☁️</span>
          Sky blue hierarchy - Production ready
          <span className="text-lg sm:text-xl">✨</span>
        </div>
      </div>
    </div>
  );
};

// PERFECT SKY BLUE LeafLink
const LeafLink = ({
  link,
  delay,
  size = "sm",
}: {
  link: string;
  delay: number;
  size?: "sm" | "md";
}) => (
  <div
    className={`group/link relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/90 via-sky-50/90 to-blue-50/90 dark:from-gray-800/90 dark:via-sky-900/50 dark:to-blue-900/50 shadow-lg sm:shadow-xl hover:shadow-2xl lg:hover:shadow-3xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-sky-200/60 hover:border-sky-400 overflow-hidden animate-leaf-float w-full sm:w-fit text-center ${size === "md" ? "min-w-[140px] sm:min-w-[160px]" : "min-w-[120px] sm:min-w-[140px]"}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 opacity-0 group-hover/link:opacity-15 transition-opacity duration-500 rounded-xl sm:rounded-2xl md:rounded-3xl" />
    <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-1.5 sm:w-2.5 md:w-3 h-1.5 sm:h-2.5 md:h-3 bg-gradient-to-b from-sky-500 to-blue-500 rounded-full shadow-lg group-hover/link:scale-125 transition-transform duration-300" />
    <span className="relative text-xs sm:text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 z-10 py-1">
      {link}
    </span>
  </div>
);

export default Sitemap;
