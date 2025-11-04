const notesData = [
  {
    id: 1,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_616_34fc5435-b516-44d1-bdeb-7ac8103c5c792.webp?v=1725617393&width=800",
    name: "ROSE",
  },
  {
    id: 2,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_6172.webp?v=1725617393&width=800",
    name: "CITRUSY",
  },
  {
    id: 3,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_618.webp?v=1725617393&width=800",
    name: "WHITE FLORAL",
  },
  {
    id: 4,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_619.webp?v=1725617393&width=800",
    name: "AQUATIC",
  },
  {
    id: 5,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_620.webp?v=1725617394&width=800",
    name: "MUSK",
  },
  {
    id: 6,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_621.webp?v=1725617393&width=800",
    name: "SPICY",
  },
  {
    id: 7,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_622.webp?v=1725617393&width=800",
    name: "Sweet",
  },
];

const ShopByNotes = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 mt-2">
      {/* Title */}
      <h2 className="text-xl sm:text-xl md:text-2xl text-center mb-6 sm:mb-8">
        SHOP BY NOTES
      </h2>

      {/* Notes images */}
      <div className="flex justify-center flex-wrap gap-4 sm:gap-6 md:gap-8">
        {notesData.map((note) => (
          <div
            key={note.id}
            className="flex flex-col items-center text-center w-20 sm:w-28 md:w-32"
          >
            <img
              src={note.image}
              alt={note.name}
              className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-2 text-xs sm:text-sm md:text-base font-medium">
              {note.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByNotes;
