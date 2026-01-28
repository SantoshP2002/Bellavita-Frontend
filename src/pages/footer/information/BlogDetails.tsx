import { useNavigate, useParams } from "react-router-dom";
import { useGetBlogById } from "../../../api/blog/service";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyData from "../../../components/empty-data/EmptyData";
import { Button } from "../../../components/Button";
import { FaArrowLeftLong } from "react-icons/fa6";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading, isError } = useGetBlogById(id!);

  if (isLoading)
    return (
      <LoadingScreen content="Footer Blogs Details Loading Please Wait !" />
    );
  if (isError || !blog) return <EmptyData content="Blog not found" />;

  return (
    <div className="dark:bg-black dark:text-white min-h-screen">
      {/* TOP IMAGE */}
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-56 sm:h-72 md:h-96 lg:h-[32rem] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 dark:to-black/80" />
      </div>

      {/* CENTER CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12">
        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-center sm:text-left">
          {blog.title}
        </h1>

        {/* DATE */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-center sm:text-left">
          {new Date(blog.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* DESCRIPTION */}
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">
          {blog.description}
        </p>

        {/* BLOG CONTENT */}
        <div
          className="prose prose-sm sm:prose md:prose-lg lg:prose-xl dark:prose-invert max-w-full mb-8"
          dangerouslySetInnerHTML={{ __html: blog.blog }}
        />

        {/* BACK BUTTON */}
        <div className="flex justify-center sm:justify-start mt-6 sm:mt-8">
          <Button
            content={
              <span className="flex items-center gap-2 text-sm sm:text-base md:text-base lg:text-lg">
                <FaArrowLeftLong />
                Back To Blogs
              </span>
            }
            pattern="outline"
            className="w-60! rounded-lg"
            buttonProps={{ onClick: () => navigate("/blogs") }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
