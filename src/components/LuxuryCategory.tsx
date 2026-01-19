import { useNavigate } from "react-router-dom";
import { luxuryCategories } from "../constants";

const LuxuryCategory = () => {
  const navigate = useNavigate();

  const getColSpan = (index: number) => {
    // Row 1 → 2 images
    if (index === 0 || index === 1) {
      return "col-span-2 lg:col-span-3";
    }

    // Row 2 → single full-width image (SKINCARE)
    if (index === 2) {
      return "col-span-2 lg:col-span-6";
    }

    // Row 3 → 2 images
    return "col-span-2 lg:col-span-3";
  };

  return (
    <div className="py-10 dark:bg-black dark:text-white">
      <h2 className="text-xl md:text-5xl text-center mb-2">
        Product Categories
      </h2>

      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 lg:text-lg text-xs">
        Exclusive beauty products crafted to enhance your natural glow
      </p>

      {/* NEEDLE LINE */}
      <span className="mx-auto block h-[2px] w-[90%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 px-4 sm:px-8 lg:px-20">
        {luxuryCategories.map((cat, index) => (
          <div
            key={index}
            className={`${getColSpan(index)} group relative overflow-hidden rounded shadow cursor-pointer`}
            onClick={() => navigate(`/products?category=${cat.value}`)}
          >
            {/* IMAGE */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-[260px] lg:h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* TEXT INSIDE IMAGE */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <span className=" text-white px-4 py-1 text-sm uppercase tracking-wide">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LuxuryCategory;
