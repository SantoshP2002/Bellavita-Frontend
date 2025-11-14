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
    name: "SWEET",
  },
];

const ShopByNotes = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 mt-2">
      {/* Title */}
      <h2 className="text-xl sm:text-xl md:text-2xl text-center mb-6 sm:mb-8">
        SHOP BY NOTES
      </h2>

      {/* Scrollable container */}
      <div className="overflow-x-auto md:overflow-x-visible">
        <div className="flex md:flex-wrap justify-start md:justify-center gap-4 sm:gap-6 md:gap-8 w-max md:w-full">
          {notesData.map((note) => (
            <div
              key={note.id}
              className="flex flex-col items-center text-center w-[122px] sm:w-28 md:w-32 flex-shrink-0"
            >
              <img
                src={note.image}
                alt={note.name}
                className="w-32 h-32 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-2 text-xs sm:text-sm md:text-base font-medium">
                {note.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByNotes;
