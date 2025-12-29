const QuizProducts = () => {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        <img
          src="https://bellavitaorganic.com/cdn/shop/files/Fragrance-Finder-Home-Page_1200-x-400_485ebb8a-29c5-453c-bc2d-d11b70b1c291.webp?v=1729248354&width=800"
          alt="left quiz image"
          className="w-full md:w-1/2 max-w-[560px] object-cover rounded shadow-md md:hover:scale-95 transition-transform duration-300 cursor-pointer"
        />
        <img
          src="https://bellavitaorganic.com/cdn/shop/files/Lipstick_Finder_Home_Page_1200_x_400.webp?v=1728042662&width=800"
          alt="right quiz image"
          className="w-full md:w-1/2 max-w-[560px] object-cover rounded shadow-md md:hover:scale-95 transition-transform duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default QuizProducts;
