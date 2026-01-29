import { FaRegStar, FaStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

import { useGetReviewByProductId } from "../../api/review/service";
import type { IReview } from "../../types";
import { Button } from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";

const AllReviews = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetReviewByProductId();

  const allReviews = data?.pages.flatMap((page) => page?.reviews || []) || [];

  return (
    <div className="max-w-lvw mx-auto px-10 py-10 dark:bg-black dark:text-white">
      <h2 className="text-2xl font-bold text-center mb-6">All Reviews</h2>

      {isLoading && (
        <LoadingScreen content="Products All Reviews Loading Please Wait !" />
      )}
      {isError && (
        <p className="text-center text-red-500">Failed to load reviews.</p>
      )}
      {allReviews.length === 0 && !isLoading && (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}

      <div className="space-y-3">
        {allReviews.map((review: IReview) => (
          <div
            key={review._id}
            className="border-b-[1px] border-gray-600 p-5 py-5"
          >
            {/* ⭐ Rating */}
            <div className="flex items-center mb-2 gap-1.5">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ) : (
                  <FaRegStar key={i} className="text-yellow-400 text-lg" />
                ),
              )}
            </div>

            {/* 👤 Name */}
            <h3 className="text-lg dark:text-gray-200 flex flex-row items-center gap-3">
              <FiUser className="text-3xl" />
              {review.name || "Anonymous"}
            </h3>

            {/* 📝 Title */}
            <p className="dark:text-gray-300 font-bold text-lg mt-2">
              {review.title || "No title provided"}
            </p>

            {/* 💬 Description */}
            <p className="dark:text-gray-300 leading-relaxed overflow-hidden">
              {review.description}
            </p>

            {/* 🖼 Optional Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="review"
                    className="w-20 h-20 rounded-md object-cover border"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            content={
              isFetchingNextPage ? (
                <span className="flex items-center gap-2">Loading...</span>
              ) : (
                "Load More"
              )
            }
            pattern="outline"
            className="w-100! mt-8 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
            buttonProps={{
              onClick: () => fetchNextPage(),
              disabled: isFetchingNextPage,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AllReviews;
