import { useState } from "react";
import { Button } from "./Button";

const perfumes = [
  {
    id: 1,
    name: "CEO Man",
    price: 999,
    image:
      "http://bellavitaorganic.com/cdn/shop/files/download_5bea8eae-fa1f-45d3-95bc-81ced6860f9d.jpg?v=1732892381&width=500",
  },
  {
    id: 2,
    name: "Skai Aquatic",
    price: 999,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_7e6fb342-20d2-42be-8b82-ca93a466d61f.jpg?v=1732892400&width=500",
  },
  {
    id: 3,
    name: "OUD Gold",
    price: 999,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_05e5f4e5-e803-430c-9b8e-2280519f4977.jpg?v=1732892512&width=500",
  },
];

const BellamoodTech = () => {
  const [selectedPerfume, setSelectedPerfume] = useState<(typeof perfumes)[0]>(
    perfumes[0]
  );

  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center p-6 md:p-16 gap-12 md:gap-20 mt-4">
      {/* 🖼️ LEFT SIDE IMAGE SECTION */}
      <div className="flex-1 relative w-full max-w-2xl h-full max-h-[800px] bg-white overflow-hidden rounded-lg shadow-md flex items-center justify-center">
        <img
          src="https://bellavitaorganic.com/cdn/shop/files/BV-Home-banner.jpg?v=1733382169&width=1500"
          alt="Perfume Banner"
          className="w-full h-full object-contain"
        />

        {/* 🧴 Overlay Buttons */}
        <div className="absolute bottom-6 md:bottom-10 flex justify-center w-full gap-4 md:gap-6">
          {perfumes.map((perfume) => (
            <Button
              key={perfume.id}
              content={
                <div className="flex justify-center gap-2">
                  <span
                    className={`md:w-4 md:h-4 rounded-full border border-white transition 
                    ${
                      selectedPerfume?.id === perfume.id
                        ? "bg-white"
                        : "bg-transparent"
                    }`}
                  ></span>
                </div>
              }
              pattern="outline"
              className="bg-black/50 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-black transition"
              buttonProps={{
                onClick: () => setSelectedPerfume(perfume),
              }}
            />
          ))}
        </div>
      </div>

      {/* 🛒 RIGHT SIDE ADD TO CART CARD */}
      <div className="w-full max-w-sm p-6 flex flex-col m-auto gap-4 border border-gray-200 rounded-lg shadow-md bg-white h-full max-h-[700px]">
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

            {/* Brand */}
            {/* <p className="text-sm text-gray-500 font-medium">
              {selectedPerfume.brand || "Bellamood"}
            </p> */}

            {/* Title */}
            <h3 className="font-semibold text-gray-800 line-clamp-1 text-lg">
              {selectedPerfume.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-black">
                ₹{selectedPerfume.price}
              </p>
            </div>

            {/* Add To Cart Button */}
            <Button
              content="Add To Cart"
              pattern="outline"
              className="w-full bg-black text-white rounded-lg hover:bg-gray-900 py-3 text-base font-medium transition"
              
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BellamoodTech;
