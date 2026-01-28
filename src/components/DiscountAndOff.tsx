import { useNavigate } from "react-router-dom";
import { BottomGradient } from "./Gradients";

const DiscountAndOff = () => {
  const navigate = useNavigate();
  const images = [
    "https://cdn.shopify.com/s/files/1/0906/2558/files/821875973-pop-gwp-at-1099-makeup-brushes-set-of-7-pouch_op_600-x-450.jpg?v=1767940136",
    "https://img.freepik.com/free-vector/special-offer-sale-banner-template_23-2149006613.jpg",
    "https://img.freepik.com/free-vector/black-friday-sale-banner_23-2149105226.jpg",
    "https://www.sugarcosmetics.com/cdn/shop/files/Gloss-Stick_KV_LP_3200-X-1200.jpg?v=1763725743&width=2000",
    "https://cdn.shopify.com/s/files/1/0906/2558/files/822939108-op.jpg?v=1768204791",
    "https://beautinique-client.vercel.app/images/home/Categories/Eyes/4.webp",
  ];

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-20 dark:bg-black dark:text-white">
      <h2 className="text-xl md:text-4xl font-semibold text-center mb-2">
        Discount & Offers
      </h2>
      {/* NEEDLE LINE */}
      <span className="mx-auto block h-[2px] w-[90%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded shadow cursor-pointer relative"
          >
            <img
              src={img}
              alt={`offer-${index}`}
              className="w-full h-[200px] sm:h-[220px] lg:h-[240px] object-cover transition-transform duration-500 hover:scale-105"
              onClick={() => navigate("/discount-details")}
            />
            {/* Bottom fade gradient for each image */}
            <BottomGradient className="h-16 z-50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountAndOff;
