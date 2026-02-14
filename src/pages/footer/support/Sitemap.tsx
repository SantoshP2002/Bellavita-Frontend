import { sitemapSections } from "../../../constants";

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white px-4 py-20">
      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">
            Sitemap
          </span>
        </h1>
        <span className="mx-auto mt-4 block h-[2px] w-28 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
      </div>

      {/* TREE ROOT */}
      <div className="flex justify-center mb-20">
        <div className="px-8 py-4 rounded-xl bg-white dark:bg-gray-900 shadow-lg font-semibold">
          Bellavita Website
        </div>
      </div>

      {/* TREE BRANCHES */}
      <div className="relative max-w-6xl mx-auto">
        {/* horizontal line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-sky-300 dark:bg-sky-700" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 pt-10">
          {sitemapSections.map((section, index) => (
            <div key={index} className="relative text-center">
              {/* vertical connector */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 h-10 w-[2px] bg-sky-300 dark:bg-sky-700" />

              {/* SECTION NODE */}
              <div className="inline-block px-6 py-3 rounded-lg bg-sky-500 text-white font-semibold shadow">
                {section.title}
              </div>

              {/* CHILD NODES */}
              <ul className="mt-6 space-y-3">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="mx-auto w-fit px-4 py-2 rounded-md bg-white dark:bg-gray-900 text-sm shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECT OVERVIEW */}
      <div className="mt-24 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Project Overview
          </span>
        </h2>

        {/* NEEDLE LINE */}
        <span className="mx-auto mb-6 block h-[2px] w-[90%] lg:w-[80%] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

        <ul className="max-w-3xl mx-auto text-sm md:text-base leading-relaxed space-y-4 text-left">
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                Bellavita
              </span>{" "}
              is a <span className="font-medium text-sky-600">modern</span> and{" "}
              <span className="font-medium text-sky-600">scalable</span>{" "}
              e-commerce frontend application designed to deliver a{" "}
              <span className="font-medium text-sky-600">
                premium shopping experience
              </span>
              .
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              The platform focuses on{" "}
              <span className="font-medium text-sky-600">beauty</span>,{" "}
              <span className="font-medium text-sky-600">perfume</span>, and{" "}
              <span className="font-medium text-sky-600">
                lifestyle products
              </span>{" "}
              with a <span className="font-medium text-sky-600">clean</span>,{" "}
              <span className="font-medium text-sky-600">elegant</span>, and{" "}
              <span className="font-medium text-sky-600">user-friendly</span>{" "}
              interface.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              Built using{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                React
              </span>{" "}
              and{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                Tailwind CSS
              </span>{" "}
              to ensure{" "}
              <span className="font-medium text-sky-600">fast performance</span>
              ,{" "}
              <span className="font-medium text-sky-600">
                component reusability
              </span>
              , and{" "}
              <span className="font-medium text-sky-600">
                responsive layouts
              </span>
              .
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              Strong emphasis on{" "}
              <span className="font-medium text-sky-600">clean UI design</span>,{" "}
              <span className="font-medium text-sky-600">
                smooth navigation
              </span>
              , and{" "}
              <span className="font-medium text-sky-600">
                consistent styling
              </span>{" "}
              across all devices.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              Core features include{" "}
              <span className="font-medium text-sky-600">product listings</span>
              ,{" "}
              <span className="font-medium text-sky-600">
                discount & offer pages
              </span>
              , <span className="font-medium text-sky-600">order tracking</span>
              , and{" "}
              <span className="font-medium text-sky-600">
                user account management
              </span>
              .
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              Application flow mirrors{" "}
              <span className="font-medium text-sky-600">
                real-world e-commerce workflows
              </span>
              , improving{" "}
              <span className="font-medium text-sky-600">usability</span> and{" "}
              <span className="font-medium text-sky-600">
                customer experience
              </span>
              .
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              The architecture is{" "}
              <span className="font-medium text-sky-600">scalable</span> and{" "}
              <span className="font-medium text-sky-600">maintainable</span>,
              enabling easy{" "}
              <span className="font-medium text-sky-600">
                future enhancements
              </span>{" "}
              and feature expansion.
            </span>
          </li>
        </ul>
      </div>

      {/* FOOT NOTE */}
      <div className="mt-32 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          This sitemap visually represents the hierarchy of the Bellavita
          website using a true tree structure for easy understanding.
        </p>
      </div>
    </div>
  );
};

export default Sitemap;
