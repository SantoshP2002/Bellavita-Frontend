import EmptyData from "../../../components/empty-data/EmptyData";
import LoadingScreen from "../../../components/LoadingScreen";
import { useGetBlog } from "../../../api/blog/service";
import type { IBlog } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";

const Blog = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetBlog();

  const blogs: IBlog[] = data?.blog || [];

  if (isLoading) {
    return <LoadingScreen content="Footer Blogs Loading Please Wait !" />;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load blogs {String(error)}</p>;
  }

  if (blogs.length === 0) {
    return <EmptyData content="No Blogs Found" />;
  }

  return (
    <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="text-center py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
          BLOGS
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Stay inspired with our latest blogs, expert insights, beauty tips,
          brand stories, and exclusive updates from our world of self-care.
        </p>

        {/* NEEDLE LINE */}
        <span className="mx-auto mt-6 block h-[2px] w-[90%] lg:w-[70%] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
      </div>

      {/* BLOG GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="group dark:bg-gray-900 rounded-xl hover:shadow-sky-300 hover:dark:shadow-sky-400 shadow-l shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* IMAGE */}
              <div className="h-40 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                  {blog.title}
                </h4>

                <p className="text-xs md:text-sm text-gray-400 mb-3">
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {blog.description}
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
                    onClick: () => navigate(`/blog/${blog._id}`),
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

export default Blog;
