import { useState } from "react";
import { Button } from "./Button";
import { perfumes } from "../constants";

const BellamoodTech = () => {
  const [selectedPerfume, setSelectedPerfume] = useState<(typeof perfumes)[0]>(
    perfumes[0],
  );

  return (
    <div className="dark:bg-black dark:text-white">
      <h2 className="text-xl md:text-5xl text-center mb-4">BELLATECH MOOD</h2>
      {/* NEEDLE LINE */}
      <span className="mx-auto block h-[2px] w-[70%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500" />

      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center p-4 sm:p-6 lg:p-16 gap-6 sm:gap-10 lg:gap-20">
        {/* 🖼️ LEFT SIDE IMAGE SECTION */}
        <div className="relative w-full lg:flex-1 max-w-2xl bg-white overflow-hidden rounded flex items-center justify-center h-[260px] sm:h-[380px] md:h-[480px] lg:h-[600px]">
          <img
            src="https://bellavitaorganic.com/cdn/shop/files/BV-Home-banner.jpg?v=1733382169&width=1500"
            alt="Perfume Banner"
            className="w-full h-full object-contain"
          />

          {/* 🧴 Overlay Buttons */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-3 sm:gap-4 md:gap-6 w-[60%] sm:w-[47%] md:w-[75%] max-w-full">
            {perfumes.map((perfume) => (
              <Button
                key={perfume.id}
                content={
                  <span
                    className={`w-3! h-3! sm:w-4! sm:h-4!  rounded-full transition ${
                      selectedPerfume?.id === perfume.id
                        ? "bg-white"
                        : "bg-transparent"
                    }`}
                  />
                }
                pattern="outline"
                className="bg-white/30 w-8! text-white p-2 rounded hover:bg-white transition"
                buttonProps={{ onClick: () => setSelectedPerfume(perfume) }}
              />
            ))}
          </div>
        </div>

        {/* 🛒 RIGHT SIDE ADD TO CART CARD */}
        <div className="w-full sm:max-w-md lg:max-w-sm p-4 sm:p-6 flex flex-col gap-4  rounded-lg shadow-md dark:text-white">
          {selectedPerfume && (
            <>
              {/* Product Image */}
              <div className="w-full aspect-square">
                <img
                  src={selectedPerfume.image}
                  alt={selectedPerfume.name}
                  className="w-full h-full object-contain rounded"
                />
              </div>

              {/* name */}
              <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
                {selectedPerfume.name}
              </h3>
              {/* brand */}
              <h3 className=" text-gray-500 text-base sm:text-sm">
                {selectedPerfume.brand}
              </h3>

              <div className="flex items-center gap-5">
                {/* Price */}
                <p className="text-lg sm:text-xl font-bold ">
                  ₹{selectedPerfume.price}
                </p>
                {/* selling Price */}
                <p className="text-lg sm:text-xs font-bold text-gray-500 line-through">
                  ₹{selectedPerfume.sellingPrice}
                </p>
              </div>

              {/* Add To Cart Button */}
              <Button
                content="Add To Cart"
                pattern="outline"
                className="  mt-4 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3
               shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BellamoodTech;
