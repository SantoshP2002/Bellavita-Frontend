import { FaRegStar, FaStar } from "react-icons/fa";
import { useGetReviewByProductId } from "../../api/review/service";
import type { IReview } from "../../types";
import { Button } from "../../components/Button";
import { FiUser } from "react-icons/fi";
import { useGetAllProductsInfinite } from "../../api/products/service";
import { useAddToCart } from "../../api/cart/service";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import EmptyData from "../../components/empty-data/EmptyData";

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

      {/* 🛍 Recommended Products Section */}
      {products.length > 0 && (
        <div className="py-3">
          <h2 className="font-bold text-2xl text-center uppercase py-10">
            You May Also Like
          </h2>

          {productsLoading ? (
            <LoadingScreen content="Products All Reviews Loading Please Wait !" />
          ) : productsError ? (
            <EmptyData content="Product Not Found 😕" />
          ) : (
            <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:px-4">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="flex flex-col justify-between bg-white transition-shadow duration-200 dark:bg-black dark:text-white"
                >
                  {/* Image & Info */}
                  <div
                    onClick={() => navigate(`/products/${p._id}`)}
                    className="cursor-pointer flex flex-col flex-1 w-full"
                  >
                    <div className="w-full h-40 sm:h-44 md:h-48 lg:h-52 flex items-center justify-center bg-gray-100 rounded">
                      <img
                        src={p.images?.[0] || "/placeholder.png"}
                        alt={p.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <p className="text-xs dark:text-gray-300 sm:font-medium line-clamp-1">
                        {p.brand}
                      </p>
                      <h3 className="text-sm mt-1  sm:font-semibold dark:text-gray-300 line-clamp-2">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="text-lg font- dark:text-white">
                          ₹{p.sellingPrice.toFixed(2)}
                        </p>
                        {p.price > p.sellingPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            ₹{p.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    content="Add To Cart"
                    pattern="outline"
                    className="w-30! lg:w-60!"
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
