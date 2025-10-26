import { FaRegStar, FaStar } from "react-icons/fa";
import { useGetReviewByProductId } from "../../api/review/service";
import type { IReview } from "../../types";
import { Button } from "../../components/Button";
import { FiUser } from "react-icons/fi";

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
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">All Reviews</h2>

      {isLoading && (
        <p className="text-center text-gray-500">Loading reviews...</p>
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
            className="border-b-[1px] border-gray-300 p-2 pb-5"
          >
            {/* ⭐ Rating */}
            <div className="flex items-center mb-2 gap-1.5">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ) : (
                  <FaRegStar key={i} className="text-yellow-400 text-lg" />
                )
              )}
            </div>

            {/* 👤 Name */}
            <h3 className="text-lg text-gray-900 flex flex-row items-center gap-3">
              <FiUser className="text-3xl" />
              {review.name || "Anonymous"}
            </h3>

            {/* 📝 Title */}
            <p className="text-gray-700 font-bold text-lg mt-2">
              {review.title || "No title provided"}
            </p>

            {/* 💬 Description */}
            <p className="text-gray-600 leading-relaxed overflow-hidden">
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
                "Load More Reviews"
              )
            }
            pattern="outline"
            className="!w-auto !px-6 !py-2"
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
