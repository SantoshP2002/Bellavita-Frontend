import { FaRegStar, FaStar } from "react-icons/fa";
import { useGetReviewByProductId } from "../../api/review/service";
import type { IReview } from "../../types";
import { Button } from "../../components/Button";
import { FiUser } from "react-icons/fi";
import { useGetAllProductsInfinite } from "../../api/products/service";
import { useAddToCart } from "../../api/cart/service";
import { useNavigate } from "react-router-dom";

const AllReviews = () => {
  const navigate = useNavigate();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetReviewByProductId();

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetAllProductsInfinite({ limit: 4 });

  const { mutateAsync: addToCart } = useAddToCart();

  const handleAddToCart = async (id: string) => {
    await addToCart(id);
  };

  const products =
    productsData?.pages?.flatMap((page) => page.products)?.slice(0, 4) || [];

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
            className="mt-4 bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all
                     duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000]"
            buttonProps={{
              onClick: () => fetchNextPage(),
              disabled: isFetchingNextPage,
            }}
          />
        </div>
      )}

      {/* 🛍 Recommended Products Section */}
      {products.length > 0 && (
        <div className="mt-12">
          <h2 className="font-bold text-2xl text-center mb-6 uppercase">
            You May Also Like
          </h2>

          {productsLoading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : productsError ? (
            <p className="text-center text-red-500">Failed to load products</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p._id} className="p-4  flex flex-col justify-between">
                  <div
                    onClick={() => navigate(`/products/${p._id}`)}
                    className="cursor-pointer"
                  >
                    <img
                      src={p.images?.[0]}
                      alt={p.title}
                      className="object-contain mb-2"
                    />
                    <p className="text-sm text-gray-500 font-medium">
                      {p.brand}
                    </p>
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-lg font-bold text-black mt-1">
                      ₹{p.sellingPrice.toFixed(2)}
                    </p>
                  </div>

                  <Button
                    content="Add To Cart"
                    pattern="outline"
                    className="mt-4 bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all
                     duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000]"
                    buttonProps={{
                      onClick: () => handleAddToCart(p._id),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
