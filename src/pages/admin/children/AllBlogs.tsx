import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../../../components/Button";
import { useDeleteBlogById, useGetBlog } from "../../../api/blog/service";
import type { IBlog } from "../../../types";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyData from "../../../components/empty-data/EmptyData";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-black rounded-xl p-4 w-[90%] max-w-sm shadow-md shadow-sky-200 dark:shadow-blue-200"
            >
              <div className="flex justify-center mb-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/12517/12517928.png"
                  className="w-16 h-16"
                />
              </div>

              <p className="text-sm text-center mb-4 dark:text-white">
                Are you sure you want to delete this blog?
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  content="Cancel"
                  pattern="outline"
                  className="rounded-lg text-gray-700 bg-gradient-to-r from-gray-200 dark:from-gray-900 via-gray-100 dark:via-gray-700 to-gray-300 dark:to-gray-600 hover:from-gray-300 dark:hover:from-gray-600 hover:to-gray-300 dark:hover:to-gray-600 transition-all duration-300"
                  buttonProps={{
                    onClick: () => {
                      setConfirmOpen(false);
                      setRemoveId(null);
                    },
                  }}
                />

                <Button
                  content="DELETE"
                  pattern="outline"
                  className="rounded-lg bg-gradient-to-r from-purple-300 dark:from-purple-600 via-rose-300 dark:via-rose-600 to-red-200 bg-[length:200%_200%] hover:bg-[position:100%_50%] transition-all duration-300"
                  buttonProps={{
                    onClick: () => {
                      if (removeId) {
                        deleteProductQuery.mutate(removeId);
                      }
                      setConfirmOpen(false);
                      setRemoveId(null);
                    },
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllBlogs;
