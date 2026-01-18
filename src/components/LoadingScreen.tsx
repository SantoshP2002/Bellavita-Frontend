const LoadingScreen = ({ content }: { content: string }) => {
  return (
    <div className="fixed inset-0 flex flex-col gap-5 items-center justify-center bg-white dark:bg-black z-50">
      <div className="relative w-32 h-[2px] overflow-hidden bg-gray-200 dark:bg-gray-600 rounded-full">
        <div className="absolute left-0 top-0  h-full w-1/1 bg-black dark:bg-white animate-slide rounded-full" />
      </div>
      <p className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent dark:bg-gradient-to-r">
        {content}
      </p>
    </div>
  );
};

export default LoadingScreen;
