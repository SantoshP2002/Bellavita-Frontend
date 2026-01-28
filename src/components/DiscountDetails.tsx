import { BottomGradient } from "./Gradients";
import { useNavigate } from "react-router-dom";

const DiscountDetails = () => {
  const navigate = useNavigate();

  const discounts = [
    {
      image:
        "https://img-cdn.publive.online/fit-in/1280x720/filters:format(webp)/elle-india/media/post_attachments/wp-content/uploads/2022/10/Untitled-design-1-1.png",
      title: "Luxury Perfume Sale",
      description:
        "Get your favorite luxury perfumes at exclusive discounted prices. Limited period offer!",
    },
    {
      image:
        "https://st3.depositphotos.com/10659292/35428/i/450/depositphotos_354289762-stock-photo-perfume-bottle-silk-folded-fabric.jpg",
      title: "Elegant Fragrances",
      description:
        "Experience the elegance of high-end fragrances at up to 40% off. Shop now!",
    },
    {
      image:
        "https://www.shutterstock.com/image-vector/cosmetic-sale-banner-50-off-600nw-2661450779.jpg",
      title: "Cosmetics Mega Sale",
      description:
        "Top cosmetic brands available at unbeatable discounts. Upgrade your makeup kit today!",
    },
    {
      image:
        "https://cdn.create.vista.com/downloads/fdd7280a-0c0d-4adc-98d2-5341efd4477a_1024.jpeg",
      title: "Exclusive Deals",
      description:
        "Limited time exclusive deals on popular beauty and cosmetic products.",
    },
    {
      image:
        "https://png.pngtree.com/png-clipart/20220404/original/pngtree-cosmetics-perfume-high-quality-gift-pink-sale-poster-png-image_7516182.png",
      title: "Gift Sets",
      description:
        "Grab special gift sets at discounted prices. Perfect for surprises!",
    },
    {
      image:
        "https://c8.alamy.com/comp/2CEH3JY/cosmetics-series-sale-vector-illustration-set-realistic-pink-packages-in-sale-ad-design-promo-banner-collection-with-cosmetic-packaging-bottles-for-skincare-on-soft-silk-and-flower-petals-background-2CEH3JY.jpg",
      title: "Skincare Discounts",
      description:
        "Premium skincare products at affordable prices. Pamper yourself!",
    },
    {
      image:
        "https://img.pikbest.com/templates/20220327/bg/252c44a3a5047.png!w700wp",
      title: "Makeup Must-Haves",
      description:
        "Top makeup essentials now at exciting discounts. Glow up your style!",
    },
    {
      image:
        "https://img.freepik.com/premium-vector/sale-social-media-post-design-template-perfumes-social-media-design-sale-offer-design-makeup_635705-1238.jpg",
      title: "Perfume Collection",
      description:
        "Choose from a wide range of perfumes at special sale prices.",
    },
    {
      image:
        "https://img.freepik.com/premium-psd/cosmetics-beauty-products-makeup-social-media-post-discount-sale-banner-design-template_84443-760.jpg",
      title: "Beauty Offers",
      description:
        "Grab beauty products with limited time offers. Shop your favorites now!",
    },
    {
      image:
        "https://img.pikbest.com/templates/20220327/bg/62151ba7582d6.png!w700wp",
      title: "Exclusive Skincare",
      description: "High-end skincare at discounted prices. Glow naturally!",
    },
    {
      image:
        "https://img.pikbest.com/templates/20220327/bg/8de0310ca0973.png!sw800",
      title: "Makeup Essentials",
      description:
        "Upgrade your makeup kit with trendy essentials at great prices.",
    },
  ];

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
