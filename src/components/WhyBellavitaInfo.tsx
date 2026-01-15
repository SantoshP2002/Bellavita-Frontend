import { whyBellavitaData } from "../constants";

const WhyBellavitaInfo = () => {
  return (
    <div className="pt-10 pb-16 px-4 sm:px-6 md:px-8 dark:bg-black dark:text-white">
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
              className="w-15 h-15 sm:w-24 sm:h-24 object-contain rounded-full bg-white shadow-sm mb-4 hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-base md:text-lg dark:text-white text-gray-800 uppercase font-medium">
              {item.title}
            </h3>
            <p className="dark:text-blue-300 text-gray-500 text-sm sm:text-xs mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Image */}
      <div className="mt-6 w-full flex justify-center items-center">
        {/* 🖥️ Desktop / Laptop / Tablet image */}
        <img
          src="https://bellavitaorganic.com/cdn/shop/files/BVO_1_1bb02228-de1c-4363-a7dc-c7d9aea3bbfb.jpg?v=1752664274&width=1990"
          alt="Bellavita banner desktop"
          className="max-w-lvw h-auto object-cover hidden sm:block"
        />

        {/* 📱 Mobile image */}
        <img
          src="https://bellavitaorganic.com/cdn/shop/files/BVO_Mobile.webp?v=1751025395&width=800"
          alt="Bellavita banner mobile"
          className="max-w-lvw h-auto object-cover block sm:hidden"
        />
      </div>
    </div>
  );
};

export default WhyBellavitaInfo;
