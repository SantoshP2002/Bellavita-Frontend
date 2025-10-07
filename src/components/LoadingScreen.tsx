const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative w-32 h-[2px] overflow-hidden bg-gray-200 rounded-full">
        <div className="absolute left-0 top-0  h-full w-1/1 bg-black animate-slide rounded-full" />
      </div>
    </div>
  );
};

export default LoadingScreen;
