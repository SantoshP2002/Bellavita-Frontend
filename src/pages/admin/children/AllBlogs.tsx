import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../../../components/Button";
import { useDeleteBlogById, useGetBlog } from "../../../api/blog/service";
import type { IBlog } from "../../../types";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyData from "../../../components/empty-data/EmptyData";
import { useEffect, useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

const AllBlogs = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const navigate = useNavigate();

  const deleteProductQuery = useDeleteBlogById();
  const { data, isLoading, isError, error } = useGetBlog();

  const blog: IBlog[] = data?.blog || [];

  useEffect(() => {
    if (confirmOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [confirmOpen]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8">
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
            <LoadingScreen content="All Blogs Loading Please Wait !" />
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
                  className="w-full object-cover rounded-md"
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

                <div className="flex flex-row items-center justify-center gap-3 mt-4">
                  {/* Update Button  */}
                  <Button
                    content="UPDATE"
                    pattern="outline"
                    className="rounded-lg"
                    buttonProps={{
                      onClick: () => navigate(`/admin/blog/edit/${blog._id}`),
                    }}
                  />

                  {/* Delete Button  */}
                  <Button
                    content="DELETE"
                    pattern="outline"
                    className="rounded-lg"
                    buttonProps={{
                      onClick: () => {
                        setRemoveId(blog._id);
                        setConfirmOpen(true);
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        open={confirmOpen}
        title="Delete Blog"
        message="Are you sure you want to delete this blog?"
        onCancel={() => {
          setConfirmOpen(false);
          setRemoveId(null);
        }}
        onConfirm={() => {
          if (removeId) deleteProductQuery.mutate(removeId);
          setConfirmOpen(false);
          setRemoveId(null);
        }}
      />
    </div>
  );
};

export default AllBlogs;
