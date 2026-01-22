import { useNavigate } from "react-router-dom";
import { useAddToCart } from "../api/cart/service";
import { useGetAllProductsInfinite } from "../api/products/service";
import type { TProduct } from "../types";
import { Button } from "./Button";
import LoadingScreen from "./LoadingScreen";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/user";
import toast from "react-hot-toast";

const HomeProducts = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllProductsInfinite({
    limit: 8,
  });
  const { mutateAsync: addToCart } = useAddToCart();

  // ✅ First 8 products only
  const products = data?.pages?.flatMap((page) => page.products) || [];

  const handleAddToCart = async (id: string) => {
    if (!isLoggedIn) {
      navigate("/login");
      toast.error("Please First Login !!");
      return;
    }

    await addToCart(id);
  };

  return (
    <div className="min-h-[550px] px-10 dark:bg-black dark:text-white dark:hover:shadow-white">
      {isLoading && (
        <LoadingScreen content="Home Product Loading Please Wait !" />
      )}
      {isError && <p className="text-red-500">Error: {String(error)}</p>}

      {products.length > 0 && (
        <div className="flex flex-col gap-8 py-4">
          {/* CONTENT HEADERS */}
          <div className="relative flex flex-wrap justify-center items-center gap-2 sm:gap-4 pt-6 sm:mt-8 text-center dark:text-white">
            <Link
              to="/products?category=bestseller"
              className="text-xl sm:text-4xl md:text-4xl"
            >
              BESTSELLER
            </Link>
            <span className="text-lg sm:text-2xl md:text-3xl">|</span>
            <Link
              to="/products?category=new_arrivals"
              className="text-xl sm:text-4xl md:text-4xl"
            >
              NEW ARRIVALS
            </Link>

            {/* NEEDLE GRADIENT BORDER */}
            <span className="absolute -bottom-5  w-[80%] h-[2px] bg-gradient-to-r from-transparent via-black to-transparent dark:via-gray-400" />
          </div>

          <div className="flex items-center justify-start overflow-x-auto gap-6 scrollbar-hide">
            {products.map((p: TProduct) => (
              <div
                key={p._id}
                className="flex flex-col outline-none py-6 min-w-[310px] lg:min-w-[265px]  min-h-[440px] bg-white dark:bg-black rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  onClick={() => navigate(`/products/${p._id}`)}
                  className="relative h-64 bg-gray-100 dark:bg-black"
                >
                  <img
                    src={p.images?.[0] || "/placeholder.png"}
                    alt={p.title}
                    className="w-full h-full object-contain p-4"
                  />

                  {p.price > p.sellingPrice && (
                    <span className="absolute bottom-2 left-2 bg-red-400 text-white text-xs px-2 py-1 rounded-xs">
                      {Math.round(((p.price - p.sellingPrice) / p.price) * 100)}
                      % OFF
                    </span>
                  )}
                </div>

                <div className="grow flex flex-col justify-between p-4 dark:bg-black dark:text-white">
                  <p className="text-xs  font-medium line-clamp-1">{p.brand}</p>

                  <h2 className="text-sm mt-1 font-semibold  line-clamp-2">
                    {p.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-lg font-bold ">
                      ₹{p.sellingPrice.toFixed(2)}
                    </p>
                    {p.price > p.sellingPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        ₹{p.price.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <Button
                    content="Add to Cart"
                    className="mt-3 bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] dark:bg-white dark:text-black dark:border-white  dark:hover:bg-black dark:hover:text-white dark:hover:shadow-[4px_4px_0_0_#fff]"
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

      {products.length === 0 && !isLoading && (
        <p className="text-center text-gray-600 text-lg mt-4">
          No products found
        </p>
      )}

      <Button
        content="VIEW ALL"
        pattern="outline"
        className="!w-60 mx-auto rounded"
        buttonProps={{
          onClick: () => navigate("/products"),
        }}
      />
    </div>
  );
};

export default HomeProducts;
