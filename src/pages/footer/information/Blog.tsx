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
    <div className="p-4 dark:bg-black dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">BLOGS</h2>

      <hr className="mb-8" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15 p-4 rounded-lg">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-1 overflow-hidden rounded-lg group dark:bg-black"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md transform origin-top transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <h4 className="text-xl mt-3 line-clamp-2">{blog.title}</h4>

              <p className="text-sm text-gray-400 mt-1">
                {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                {blog.description}
              </p>

              {/* READ MORE BUTTON */}
              <Button
                content={
                  <span className="flex items-center gap-2 leading-none">
                    {/* LEFT LINE */}
                    <span className="h-[1.5px] w-6 bg-blue-600 dark:bg-white transition-all duration-300 group-hover:w-14  translate-y-[1px]" />
                    {/* TEXT */}
                    <span className="leading-none dark:text-white">
                      Read more
                    </span>
                  </span>
                }
                pattern="primary"
                className="mt-4 text-sm font-medium text-blue-600 flex items-center justify-start p-0 group"
                buttonProps={{
                  onClick: () => navigate(`/blog/${blog._id}`),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
