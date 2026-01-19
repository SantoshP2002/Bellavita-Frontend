const QuizProducts = () => {
  return (
    <div className="py-10 flex items-center justify-center dark:bg-black">
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        <img
          src="https://www.sugarcosmetics.com/cdn/shop/collections/Lipstick_-_Main_banner.jpg?v=1733735800&width=1600"
          alt="left quiz image"
          className="w-full md:w-1/2 max-w-[560px] object-cover rounded shadow-md md:hover:scale-95 transition-transform duration-300 cursor-pointer"
        />
        <img
          src="https://www.sugarcosmetics.com/cdn/shop/collections/Partner-in-Shine-Transferproof-Lip-Gloss-LP1600x400_e5970f90-cfa5-4348-9b8e-16a778a6bc44.jpg?v=1734367222&width=1600"
          alt="right quiz image"
          className="w-full md:w-1/2 max-w-[560px] object-cover rounded shadow-md md:hover:scale-95 transition-transform duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default QuizProducts;
