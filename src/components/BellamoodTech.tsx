import { useState } from "react";
import { Button } from "./Button";

const perfumes = [
  {
    id: 1,
    name: "OCEAN Man Perfume - 100 mL",
    brand: "BELLAVITA (Perfume Gift Set for Men)",
    price: 2345,
    sellingPrice: 1000,
    image:
      "http://bellavitaorganic.com/cdn/shop/files/download_5bea8eae-fa1f-45d3-95bc-81ced6860f9d.jpg?v=1732892381&width=500",
  },
  {
    id: 2,
    name: "Luxury Collection Gift Set - 4 x 20ml",
    brand: "BELLAVITA (EAU DE PARFUM)",
    price: 5432,
    sellingPrice: 1000,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_7e6fb342-20d2-42be-8b82-ca93a466d61f.jpg?v=1732892400&width=500",
  },
  {
    id: 3,
    name: "Luxury Perfume Gift Set For Men - 4 x 20ml",
    brand: "BELLAVITA (Pack of 10 x 5ml perfumes.)",
    price: 1234,
    sellingPrice: 1000,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_05e5f4e5-e803-430c-9b8e-2280519f4977.jpg?v=1732892512&width=500",
  },
];

const BellamoodTech = () => {
  const [selectedPerfume, setSelectedPerfume] = useState<(typeof perfumes)[0]>(
    perfumes[0]
  );

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center p-4 sm:p-6 lg:p-16 gap-6 sm:gap-10 lg:gap-20 mt-4">
      {/* 🖼️ LEFT SIDE IMAGE SECTION */}
      <div className="relative w-full lg:flex-1 max-w-2xl bg-white overflow-hidden rounded-lg flex items-center justify-center h-[260px] sm:h-[380px] md:h-[480px] lg:h-[600px]">
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
      <div className="w-full sm:max-w-md lg:max-w-sm p-4 sm:p-6 flex flex-col gap-4 border border-gray-200 rounded-lg shadow-md bg-white">
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
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg line-clamp-1">
              {selectedPerfume.name}
            </h3>
            {/* brand */}
            <h3 className=" text-gray-500 text-base sm:text-sm">
              {selectedPerfume.brand}
            </h3>

            <div className="flex items-center gap-5">
              {/* Price */}
              <p className="text-lg sm:text-xl font-bold text-black">
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
  );
};

export default BellamoodTech;
