import { FaRegStar, FaStar } from "react-icons/fa";
import { useGetReviewByProductId } from "../../api/review/service";
import type { IReview } from "../../types";
import { Button } from "../../components/Button";

const AllReviews = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetReviewByProductId();

  const allReviews = data?.pages.flatMap((page) => page?.data || []) || [];
  return (
    <div>
      {/* Reviews List */}
      <div className="mt-10 space-y-6">
        {isLoading && <p>Loading reviews...</p>}
        {isError && <p>Failed to load reviews.</p>}
        {allReviews.length === 0 && !isLoading && <p>No reviews yet.</p>}

        {allReviews.map((review: IReview) => (
          <div key={review._id} className="border-b pb-4 text-left">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <FaStar key={i} className="text-yellow-400" />
                ) : (
                  <FaRegStar key={i} className="text-yellow-400" />
                )
              )}
              <span className="ml-2 font-semibold">{review.title}</span>
            </div>
            <p className="text-gray-600 mt-1">{review.description}</p>
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mt-2">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="review"
                    className="w-16 h-16 rounded object-cover border"
                  />
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">
              By {review.name || "Anonymous"}
            </p>
          </div>
        ))}
        {hasNextPage && (
          <div className="flex justify-center mt-6">
            <Button
              content={isFetchingNextPage ? "Loading..." : "Load More Reviews"}
              pattern="outline"
              buttonProps={{
                onClick: () => fetchNextPage(),
                disabled: isFetchingNextPage,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
