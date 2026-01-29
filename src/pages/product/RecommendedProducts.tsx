import { useNavigate } from "react-router-dom";
import { useAddToCart } from "../../api/cart/service";
import { useGetAllProductsInfinite } from "../../api/products/service";
import { Button } from "../../components/Button";
import EmptyData from "../../components/empty-data/EmptyData";
import LoadingScreen from "../../components/LoadingScreen";

const RecommendedProducts = () => {
  const navigate = useNavigate();

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetAllProductsInfinite({ limit: 8 });

  const products =
    productsData?.pages?.flatMap((page) => page.products)?.slice(0, 8) || [];

  const { mutateAsync: addToCart } = useAddToCart();

  const handleAddToCart = async (id: string) => {
    await addToCart(id);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="py-5 bg-gray-50 dark:bg-black">
          {/* Section Title */}
          <h2 className="font-extrabold text-2xl lg:text-3xl md:text-4xl text-center uppercase mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600">
            You May Also Like
          </h2>

          {/* Needle Line */}
          <span className="mx-auto block h-[2px] w-[90%] lg:w-[70%] bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-10" />

          {productsLoading ? (
            <LoadingScreen content="Products Loading, Please Wait!" />
          ) : productsError ? (
            <EmptyData content="Product Not Found 😕" />
          ) : (
            <div className="relative">
              {/* Scrollable container */}
              <div className="max-w-5xl mx-auto flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6">
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="min-w-[320px] sm:min-w-[360px] md:min-w-[420px] lg:min-w-[250px] dark:bg-black rounded-lg hover:shadow-xl cursor-pointer"
                  >
                    {/* Image Container */}
                    <div
                      onClick={() => navigate(`/products/${p._id}`)}
                      className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 flex items-center justify-center overflow-hidden rounded-t-xl bg-gray-100"
                    >
                      <img
                        src={p.images?.[0] || "/placeholder.png"}
                        alt={p.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-3 flex flex-col justify-between h-36">
                      <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 line-clamp-1">
                        {p.brand}
                      </p>
                      <h3 className="text-sm sm:text-base font-semibold mt-1 dark:text-white line-clamp-2">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-base sm:text-lg font-bold text-black dark:text-white">
                          ₹{p.sellingPrice.toFixed(2)}
                        </p>
                        {p.price > p.sellingPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            ₹{p.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Add To Cart Button */}
                    <div className="px-3 pb-3">
                      <Button
                        content="Add To Cart"
                        pattern="outline"
                        className="rounded-lg"
                        buttonProps={{
                          onClick: () => handleAddToCart(p._id),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
