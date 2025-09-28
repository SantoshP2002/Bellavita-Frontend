import { useNavigate } from "react-router-dom";
import { luxuryCategories } from "../constants";

const LuxuryCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-16 text-center">
      <h2 className="text-xl md:text-3xl mb-8">LUXURY CATEGORIES</h2>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 px-4 sm:px-8 lg:px-20">
        {luxuryCategories.map((cat, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/products?category=${encodeURIComponent(cat.category)}`)
            }
            className="flex flex-col items-center transition hover:scale-105 cursor-pointer p-2"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="object-cover rounded shadow"
            />
            <p className="mt-3 text-sm sm:text-base font-medium uppercase">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LuxuryCategory;
