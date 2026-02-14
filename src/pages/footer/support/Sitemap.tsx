import { sitemapSections } from "../../../constants";

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Sitemap
        </h1>
        {/* NEEDLE LINE  */}
        <span className="mx-auto block h-[2px] w-[70%] mt-2 bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500" />
      </div>

      {/* Sitemap Sections */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sitemapSections.map((section, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-sky-600 mb-4">
              {section.title}
            </h2>

            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <li
                  key={i}
                  className="text-gray-700 dark:text-gray-300 text-sm hover:text-sky-600 cursor-pointer"
                >
                  • {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
        © Bellavita Website Sitemap
      </div>
    </div>
  );
};

export default Sitemap;
