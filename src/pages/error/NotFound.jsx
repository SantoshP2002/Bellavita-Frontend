const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-9xl font-extrabold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFound;
