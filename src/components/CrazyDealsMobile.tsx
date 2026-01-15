import { deals } from "../constants";
import { Button } from "./Button";

const CrazyDealsMobile = () => {
  return (
    <div className="sm:hidden px-4 py-4 space-y-4 dark:bg-black dark:text-white">
      <p className="text-center text-xl font-medium">Crazy Deals</p>
      {deals.map((item) => {
        const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

        return (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden shadow-sm bg-white dark:bg-black dark:text-white"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {/* Content */}
            <div className="p-4 space-y-1">
              <h2 className="text-base font-semibold text-center">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 text-center">{item.brand}</p>

              {/* Price */}
              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="text-sm line-through text-gray-400">
                  ₹{item.mrp}
                </span>

                <span className="text-lg font-bold text-black dark:text-white">
                  ₹{item.price}
                </span>

                <span className="text-sm font-semibold text-green-600">
                  {discount}% OFF
                </span>
              </div>

              <Button
                content="Build Your Box"
                pattern="outline"
                className=" bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CrazyDealsMobile;
