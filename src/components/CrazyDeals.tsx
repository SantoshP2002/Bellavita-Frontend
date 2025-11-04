const crazyDealsData = [
  {
    id: 1,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/678-548-01_eea37bd3-72d6-4d36-be25-1f2a754829d3.webp?v=1729493571&width=800",
    name: "SELF CARE KIT",
  },
  {
    id: 2,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/678-548-01_69ed5841-67fb-420d-a671-e48ce7508e78.jpg?v=1752841390&width=800",
    name: "SELF LOVE KIT",
  },
  {
    id: 3,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/678-548_eb6ded9c-5f74-4726-baa0-fb6a86472da3.webp?v=1727433124&width=800",
    name: "BADE MIYA CHHOTE MIYA",
  },
];

const mappedData = [
  { id: 1, title: "Extra 10% Off" },
  { id: 2, title: "Buy 1 Get 1 Free" },
  { id: 3, title: "Limited Time Offer" },
];

const CrazyDeals = () => {
  return (
    <div className="p-6">
      {/* Heading */}
      <div>
        <h5 className="text-xl sm:text-xl md:text-2xl text-center mb-6">
          CRAZY DEALS
        </h5>
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
            <p className="mt-3 text-xs text-gray-800">{deal.name}</p>
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
