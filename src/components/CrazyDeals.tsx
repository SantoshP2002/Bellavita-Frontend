import { crazyDealsData, mappedData } from "../constants";

const CrazyDeals = () => {
  return (
    <div className="p-6 dark:bg-black dark:text-white">
      {/* Heading */}
      <div>
        <h5 className="text-xl sm:text-xl md:text-2xl text-center mb-6">
          CRAZY DEALS
        </h5>
        {/* NEEDLE LINE */}
        <span className="mx-auto block h-[2px] w-[60%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />
      </div>

      {/* Images section */}
      <div className="flex flex-wrap justify-center items-center gap-10 mb-10">
        {crazyDealsData.map((deal) => (
          <div key={deal.id} className="flex flex-col items-center">
            {/* Image box */}
            <div className="overflow-hidden w-80">
              <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Name below image */}
            <p className="mt-3 text-xs dark:text-gray-200">{deal.name}</p>
          </div>
        ))}
      </div>

      {/* Mapped data div */}
      <div className="flex justify-center gap-6 flex-wrap">
        {mappedData.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm"
          >
            <h3 className="text-base font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrazyDeals;
