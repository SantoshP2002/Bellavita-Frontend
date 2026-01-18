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

  if (isLoading) return <LoadingScreen content="Footer Blogs Details Loading Please Wait !"/>;
  if (isError || !blog) return <EmptyData content="Blog not found" />;

  return (
    <>
      {/* TOP IMAGE */}
      <img src={blog.image} alt={blog.title} className="w-full" />

      {/* CENTER CONTENT */}
      <div className="max-w-lvw lg:px-40 p-6 mx-auto dark:bg-black dark:text-white">
        <p className="text-xl lg:text-5xl font-medium mt-12 ">{blog.title}</p>

        <p className="text-sm text-gray-400 mt-4">
          {new Date(blog.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="text-lg prose prose-lg max-w-none mt-6 dark:text-gray-300">
          {blog.description}
        </p>

        <div
          className="text-lg prose prose-lg max-w-none mt-6 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: blog.blog }}
        />

        {/* Go Back Button   */}
        <Button
          content="Back To Blogs"
          pattern="outline"
          className="w-60! mt-8 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
          icons={{
            left: <FaArrowLeftLong />,
          }}
          buttonProps={{ onClick: () => navigate("/blogs") }}
        />
      </div>
    </>
  );
};

export default BlogDetails;
