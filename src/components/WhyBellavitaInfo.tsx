const whyBellavitaData = [
  {
    title: "CRUELTY FREE",
    description:
      "Kindness in every bottle: Our commitment to cruelty-free Products.",
    image:
      "https://static.vecteezy.com/system/resources/previews/036/363/698/non_2x/cruelty-free-icon-eco-friendly-natural-cruelty-free-and-gentle-on-skin-icon-free-vector.jpg",
  },
  {
    title: "FRAGRANCE FORWARD",
    description: "Luxurious & imported perfume oils in every product.",
    image:
      "https://c8.alamy.com/comp/2PP9RTK/fragrance-free-vector-line-circle-stamp-no-fragrances-for-cosmetics-packaging-label-2PP9RTK.jpg",
  },
  {
    title: "AFFORDABLE LUXURY",
    description: "Offering Premium Quality and Elegance at a Reasonable Price.",
    image:
      "https://static.vecteezy.com/system/resources/previews/028/307/994/non_2x/wallet-icon-simple-outline-style-affordable-investment-money-cash-dollar-bill-payment-business-finance-concept-thin-line-symbol-isolated-on-white-background-svg-vector.jpg",
  },
  {
    title: "GENDER NEUTRAL",
    description:
      "Elevate your self-care routine with bath, body and personal care for all.",
    image:
      "https://www.shutterstock.com/image-vector/gender-neutral-symbol-thin-line-260nw-1614585991.jpg",
  },
];

const WhyBellavitaInfo = () => {
  return (
    <div className="mt-10">
      {/* Title */}
      <h2 className="text-xl md:text-2xl text-center mb-6 tracking-wide">
        WHY BELLAVITA ?
      </h2>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-8 text-center">
        {whyBellavitaData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full bg-white shadow-sm mb-4 hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-base md:text-lg text-gray-800 uppercase font-medium">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm sm:text-xs mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Image */}
      <div className="mt-6 w-full">
        {/* 🖥️ Desktop / Laptop / Tablet image */}
        <img
          src="https://bellavitaorganic.com/cdn/shop/files/BVO_1_1bb02228-de1c-4363-a7dc-c7d9aea3bbfb.jpg?v=1752664274&width=1920"
          alt="Bellavita banner desktop"
          className="w-full h-auto object-cover hidden sm:block"
        />
    
        {/* 📱 Mobile image */}
        <img
          src="https://bellavitaorganic.com/cdn/shop/files/BVO_Mobile.webp?v=1751025395&width=800"
          alt="Bellavita banner mobile"
          className="w-full h-auto object-cover block sm:hidden"
        />
      </div>
    </div>
  );
};

export default WhyBellavitaInfo;
