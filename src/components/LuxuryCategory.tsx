import { useNavigate } from "react-router-dom";
import { luxuryCategories } from "../constants";

const LuxuryCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="relative py-10 text-center dark:bg-black dark:text-white">
      <h2 className="text-xl md:text-5xl mb-2">Product Categories</h2>

      <p className="text-black dark:text-gray-400 mb-2">
        Exclusive beauty products crafted to enhance your natural glow, from
        skincare to makeup essentials.
      </p>

      {/* NEEDLE GRADIENT LINE */}
      <span className="mx-auto block h-[2px] w-[90%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 px-4 sm:px-8 lg:px-20">
        {luxuryCategories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <img
              src={cat.image}
              alt={cat.name}
              onClick={() => navigate(`/products?category=${cat.value}`)}
              role="button"
              className="object-cover rounded shadow hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
            <p className="mt-5 text-sm sm:text-base font-medium uppercase">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LuxuryCategory;
