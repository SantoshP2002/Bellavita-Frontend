const NewsRoom = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <div className="text-center py-20 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Newsroom
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Stay updated with the latest announcements, product launches, brand
          stories, and exclusive updates from our beauty world.
        </p>

        {/* NEEDLE LINE */}
        <span className="mx-auto mt-6 block h-[2px] w-[90%] lg:w-[70%]  bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
      </div>

      {/* NEWS CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
            <div className="h-40 bg-gradient-to-r from-pink-400 to-rose-500 flex flex-col items-center justify-center text-white text-center px-4">
              <h4 className="text-lg font-semibold mb-1">Product Launch</h4>
              <p className="text-xs opacity-90">Premium Beauty Collection</p>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                New Luxury Perfume Launch
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Discover our latest premium fragrance collection crafted for
                elegance and long-lasting impressions.
              </p>
              <span className="text-xs font-medium text-orange-500">
                Read More →
              </span>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
            <div className="h-40 bg-gradient-to-r from-purple-400 to-indigo-500 flex flex-col items-center justify-center text-white text-center px-4">
              <h4 className="text-lg font-semibold mb-1">
                Special Announcement
              </h4>
              <p className="text-xs opacity-90">Exclusive Beauty Updates</p>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Exclusive Festive Offers
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Limited-time festive discounts on skincare and makeup
                essentials. Don’t miss out!
              </p>
              <span className="text-xs font-medium text-orange-500">
                Read More →
              </span>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
            <div className="h-40 bg-gradient-to-r from-yellow-400 to-orange-500 flex flex-col items-center justify-center text-white text-center px-4">
              <h4 className="text-lg font-semibold mb-1">Brand Story</h4>
              <p className="text-xs opacity-90">Innovation • Quality • Trust</p>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Behind the Brand</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Learn how our beauty experts design products with quality,
                sustainability, and innovation.
              </p>
              <span className="text-xs font-medium text-orange-500">
                Read More →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsRoom;
