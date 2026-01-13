import { shopNotesData } from "../../constants";

const ShopByNotes = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 dark:bg-black dark:text-white">
      {/* Title */}
      <h2 className="text-xl sm:text-xl md:text-2xl text-center mb-10 sm:mb-8 dark:border-white border-b-2 w-max mx-auto">
        SHOP BY NOTES
      </h2>

      {/* Scrollable container */}
      <div className="overflow-x-auto md:overflow-x-visible">
        <div className="flex md:flex-wrap justify-start md:justify-center gap-4 sm:gap-6 md:gap-8 w-max md:w-full">
          {shopNotesData.map((note) => (
            <div
              key={note.id}
              className="flex flex-col items-center text-center w-[122px] sm:w-28 md:w-32 flex-shrink-0"
            >
              <img
                src={note.image}
                alt={note.name}
                className="w-32 h-32 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-2 text-xs sm:text-sm md:text-base font-sm">
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
