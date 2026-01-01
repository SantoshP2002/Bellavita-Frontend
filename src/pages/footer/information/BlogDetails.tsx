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

  if (isLoading) return <LoadingScreen />;
  if (isError || !blog) return <EmptyData content="Blog not found" />;

  return (
    <>
      {/* FULL WIDTH IMAGE */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-4">
        <img src={blog.image} alt={blog.title} className="w-full h-[90vh]" />
      </div>

      {/* CENTER CONTENT */}
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-5xl font-medium mt-12">{blog.title}</p>

        <p className="text-sm text-gray-400 mt-4">
          {new Date(blog.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="text-lg prose prose-lg max-w-none mt-6 text-gray-700">
          {blog.description}
        </p>

        <div
          className="text-lg prose prose-lg max-w-none mt-6 text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.blog }}
        />

        {/* Go Back Button   */}
        <Button
          content="Back To Blogs"
          pattern="outline"
          className="mt-10 w-40! gap-3"
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
