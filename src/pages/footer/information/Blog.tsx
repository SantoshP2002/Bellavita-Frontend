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
    <div className="p-6 dark:bg-black dark:text-white min-h-screen">
      {/* HEADER */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
        BLOGS
      </h2>

      {/* NEEDLE LINE */}
      <span className="mx-auto block h-[2px] w-[90%] bg-gradient-to-r from-transparent via-sky-400 to-transparent dark:via-sky-600 mb-12" />

      {/* BLOG GRID */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 group"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 md:h-52 lg:h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h4 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                  {blog.title}
                </h4>

                <p className="text-xs md:text-sm text-gray-400 mb-3">
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-4">
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
