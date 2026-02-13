import { useNavigate, useParams } from "react-router-dom";
import { useGetNewsroomById } from "../../../api/newsroom/service";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyData from "../../../components/empty-data/EmptyData";
import { Button } from "../../../components/Button";
import { FaArrowLeftLong } from "react-icons/fa6";

const NewsroomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: newsroom, isLoading, isError } = useGetNewsroomById(id!);

  console.log("NEWSROOMS11111", newsroom);

  if (isLoading)
    return <LoadingScreen content="Newsroom Details Loading Please Wait !" />;

  if (isError || !newsroom) return <EmptyData content="Newsroom not found" />;

  return (
    <div className="dark:bg-black dark:text-white min-h-screen">
      {/* TOP IMAGE */}
      <div className="relative">
        <img
          src={newsroom.image}
          alt={newsroom.title}
          className="w-full h-56 sm:h-72 md:h-96 lg:h-[32rem] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 dark:to-black/80" />
      </div>

      {/* CENTER CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12">
        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-center sm:text-left">
          {newsroom.title}
        </h1>

        {/* DATE */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-center sm:text-left">
          {new Date(newsroom.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* SHORT DESCRIPTION */}
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">
          {newsroom.description}
        </p>

        {/* FULL CONTENT */}
        <div
          className="prose prose-sm sm:prose md:prose-lg lg:prose-xl dark:prose-invert max-w-full mb-8"
          dangerouslySetInnerHTML={{ __html: newsroom.newsroom }}
        />

        {/* BACK BUTTON */}
        <div className="flex justify-center sm:justify-start mt-6 sm:mt-8">
          <Button
            content={
              <span className="flex items-center gap-2">
                <FaArrowLeftLong />
                Back To Newsroom
              </span>
            }
            pattern="outline"
            className="w-60! rounded-lg"
            buttonProps={{ onClick: () => navigate("/newsroom") }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsroomDetails;
