import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../../../components/Button";
import { useGetBlog } from "../../../api/blog/service";
import type { IBlog } from "../../../types";

const AllBlogs = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetBlog();

  const blogs: IBlog[] = data?.blog || [];

  console.log("BLOGS11", blogs);

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>{String(error)}</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-700">ALL BLOGS</h3>

        <Button
          content="UPLOAD BLOG"
          pattern="secondary"
          className="!w-50"
          icons={{
            right: <AiOutlineCloudUpload className="w-6 h-6" />,
          }}
          buttonProps={{
            onClick: () => navigate("upload"),
          }}
        />
      </div>

      <hr className="my-4" />

      {/* ALL BLOGS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg p-4 shadow-sm">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h4 className="text-lg font-semibold mt-3">{blog.title}</h4>
            <p>
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p className="text-sm text-gray-600 mt-1">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
