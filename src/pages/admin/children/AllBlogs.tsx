import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../../../components/Button";
import { useDeleteBlogById, useGetBlog } from "../../../api/blog/service";
import type { IBlog } from "../../../types";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyData from "../../../components/empty-data/EmptyData";

const AllBlogs = () => {
  const navigate = useNavigate();

  const deleteProductQuery = useDeleteBlogById();
  const { data, isLoading, isError, error } = useGetBlog();

  const blog: IBlog[] = data?.blog || [];

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductQuery.mutate(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-10">
        <h3 className="text-2xl font-bold dark:text-white">ALL BLOGS</h3>

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

      {/* ALL BLOGS LIST */}
      <div>
        {isLoading && (
          <p>
            <LoadingScreen  content="All Blogs Loading Please Wait !"/>
          </p>
        )}
        {isError && (
          <p className="text-red-500">
            Failed to load products {String(error)}
          </p>
        )}

        {blog.length === 0 ? (
          <p className="text-black mt-4 text-xl font-semibold">
            <EmptyData content="No Blog Found" />
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-200 rounded-lg p-4 hover:shadow-sm dark:bg-black"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h4 className="text-lg font-semibold mt-3 line-clamp-2">
                  {blog.title}
                </h4>
                <p>
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm text-gray-600 mt-1 line-clamp-5">
                  {blog.description}
                </p>

                <div className="flex flex-row gap-2">
                  {/* Update Button  */}
                  <Button
                    content="Update"
                    className="mt-4 w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    buttonProps={{
                      onClick: () => navigate(`/admin/blog/edit/${blog._id}`),
                    }}
                  />

                  {/* Delete Button  */}
                  <Button
                    pattern="secondary"
                    content="Delete"
                    className="mt-4 w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    buttonProps={{
                      onClick: () => handleDelete(blog._id),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
