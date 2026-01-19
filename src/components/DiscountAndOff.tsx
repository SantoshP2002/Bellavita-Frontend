const DiscountAndOff = () => {
  const images = [
    "https://cdn.shopify.com/s/files/1/0906/2558/files/821875973-pop-gwp-at-1099-makeup-brushes-set-of-7-pouch_op_600-x-450.jpg?v=1767940136",
    "https://img.freepik.com/free-vector/special-offer-sale-banner-template_23-2149006613.jpg",
    "https://img.freepik.com/free-vector/black-friday-sale-banner_23-2149105226.jpg",
    "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/company/5842/applications/6523fa5f41f4eb4c10a1d869/theme/pictures/free/original/theme-image-1750934960502.jpeg",
    "https://cdn.shopify.com/s/files/1/0906/2558/files/822939108-op.jpg?v=1768204791",
    "https://www.shutterstock.com/shutterstock/photos/2558606947/display_1500/stock-vector-a-colorful-beauty-banner-offering-a-discount-on-makeup-products-lipstick-mascara-face-foundation-2558606947.jpg",
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
