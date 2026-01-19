const DiscountAndOff = () => {
  const images = [
    "https://img.freepik.com/free-vector/discount-banner-template_23-2148708960.jpg",
    "https://img.freepik.com/free-vector/special-offer-sale-banner-template_23-2149006613.jpg",
    "https://img.freepik.com/free-vector/black-friday-sale-banner_23-2149105226.jpg",
    "https://img.freepik.com/free-vector/flash-sale-banner-template_23-2148897327.jpg",
    "https://img.freepik.com/free-vector/mega-sale-banner-template_23-2149051334.jpg",
    "https://img.freepik.com/free-vector/super-sale-banner-template_23-2149067049.jpg",
  ];

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-20 dark:bg-black dark:text-white">
      <h2 className="text-xl md:text-4xl font-semibold text-center mb-2">
        Discount & Offers
      </h2>
      {/* NEEDLE LINE */}
      <span className="mx-auto block h-[2px] w-[90%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded shadow cursor-pointer"
          >
            <img
              src={img}
              alt={`offer-${index}`}
              className="
                w-full h-[200px] sm:h-[220px] lg:h-[240px]
                object-cover
                transition-transform duration-500
                hover:scale-105
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountAndOff;
