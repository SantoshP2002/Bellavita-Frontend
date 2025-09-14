const LoadingScreen = () => {
  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center bg-white fixed inset-0 z-[100]">
      <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4 shadow-lg shadow-indigo-300/50" />
      <p className="text-lg font-semibold text-gray-700 animate-bounce">
        Loading...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Please wait, we are preparing things for you ✨
      </p>
    </div>
  );
};

export default LoadingScreen;
