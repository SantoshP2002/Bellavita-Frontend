import { discounts } from "../constants";
import { BottomGradient } from "./Gradients";
import { useNavigate } from "react-router-dom";

const DiscountDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-8 lg:px-20 dark:bg-black dark:text-white">
      <h2 className="text-xl md:text-4xl font-semibold text-center mb-4">
        Discount Details
      </h2>

      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Check out our exclusive discounts on beauty products. Limited time
        offers available on premium perfumes, cosmetics, and skincare items.
      </p>

      {/* NEEDLE LINE */}
      <span className="mx-auto block h-[2px] w-[90%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded shadow cursor-pointer w-full"
            onClick={() => navigate("/discount-details")}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[220px] md:h-[260px] lg:h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Bottom Gradient */}
            <BottomGradient className="h-16 z-10" />

            {/* Text overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white dark:text-white">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Extra paragraph below grid */}
      <div className="mt-10 text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
        <h3 className="text-2xl font-semibold mb-2">Why Shop Our Discounts?</h3>
        <p>
          We offer premium beauty and cosmetic products at unbeatable prices.
          From luxury perfumes to high-quality skincare and makeup essentials,
          our limited-time offers ensure you get the best value without
          compromising on quality. Shop now and enjoy exclusive deals tailored
          for your beauty needs.
        </p>

        <div className="mt-12 max-w-full mx-auto px-4 sm:px-8">
          {/* Section Title */}
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-2">
            Today's Top Offers
          </h3>
          {/* Needle Line */}
          <span className="mx-auto block h-[2px] w-[90%] lg:w-[70%] bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-8" />

          {/* 4 Boxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="relative group p-6 rounded-lg border-t-4 border-l-4 border-transparent bg-gradient-to-r from-pink-100 to-pink-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <h4 className="font-semibold text-lg mb-2">50% Off Perfumes</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Exclusive designer perfumes now at half price. Limited stock!
              </p>
            </div>

            {/* Box 2 */}
            <div className="relative group p-6 rounded-lg border-t-4 border-l-4 border-transparent bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <h4 className="font-semibold text-lg mb-2">
                Makeup Essentials - 40% Off
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Top cosmetic brands available at amazing discounts. Upgrade your
                kit!
              </p>
            </div>

            {/* Box 3 */}
            <div className="relative group p-6 rounded-lg border-t-4 border-l-4 border-transparent bg-gradient-to-r from-green-100 to-green-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <h4 className="font-semibold text-lg mb-2">Skincare Bundles</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Premium skincare bundles at unbeatable prices. Perfect for
                gifting.
              </p>
            </div>

            {/* Box 4 */}
            <div className="relative group p-6 rounded-lg border-t-4 border-l-4 border-transparent bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <h4 className="font-semibold text-lg mb-2">
                Exclusive Flash Deals
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Limited time flash deals on luxury beauty products. Grab them
                now!
              </p>
            </div>
            {/* Box 5 */}
            <div className="relative group p-6 rounded-lg border-t-4 border-l-4 border-transparent bg-gradient-to-r from-purple-100 to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <h4 className="font-semibold text-lg mb-2">
                Limited Combo Offers
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Save more with curated beauty combos including perfumes,
                skincare, and makeup essentials at special bundle prices.
              </p>
            </div>
            {/* Box 6 */}
            <div className="relative group p-6 rounded-lg border-t-4 border-l-4 border-transparent bg-gradient-to-r from-rose-100 to-rose-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <h4 className="font-semibold text-lg mb-2">
                New Arrival Discounts
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Get exciting discounts on newly launched beauty products before
                anyone else. Fresh trends, better prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountDetails;
