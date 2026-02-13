import { useNavigate } from "react-router-dom";
import { useGetAllNewsroom } from "../../../api/newsroom/service";
import { Button } from "../../../components/Button";
import type { INewsroom } from "../../../types";

const NewsRoom = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAllNewsroom();
  const newsroom = data?.newsroom || [];

  return (
    <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <div className="text-center py-20 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Newsroom
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Stay updated with the latest announcements, product launches, brand
          stories, and exclusive updates from our beauty world.
        </p>

        {/* NEEDLE LINE */}
        <span className="mx-auto mt-6 block h-[2px] w-[90%] lg:w-[70%] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
      </div>

      {/* NEWS CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 pb-20">
        {isLoading && (
          <p className="text-center text-gray-500">Loading newsroom...</p>
        )}

        {isError && (
          <p className="text-center text-red-500">Failed to load newsroom</p>
        )}

        {!isLoading && newsroom.length === 0 && (
          <p className="text-center text-gray-500">No newsroom found</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsroom.map((item: INewsroom) => (
            <div
              key={item._id}
              className="group dark:bg-gray-900 rounded-xl hover:shadow-sky-300 hover:dark:shadow-sky-400 shadow-l shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* IMAGE */}
              <div className="h-40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-400 mb-3">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* READ MORE BUTTON */}
                <Button
                  content={
                    <span className="flex items-center gap-2 group-hover:text-sky-500 transition-colors duration-300">
                      <span className="h-[1.5px] w-8 bg-sky-500 group-hover:w-16 transition-all duration-300" />
                      <span className="font-medium">Read more</span>
                    </span>
                  }
                  pattern="primary"
                  className="mt-5 text-sm p-0"
                  buttonProps={{
                    onClick: () => navigate(`/newsroom/${item._id}`),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsRoom;
