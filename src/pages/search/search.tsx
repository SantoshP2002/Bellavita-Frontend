import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllProducts } from "../../api/products/service";
import type { TProduct } from "../../types";
import LoadingScreen from "../../components/LoadingScreen";
import EmptyData from "../../components/empty-data/EmptyData";
import { Button } from "../../components/Button";
import { IoCartOutline } from "react-icons/io5";
import { useUserStore } from "../../store/user";
import { useAddToCart } from "../../api/cart/service";

const SearchPage = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? undefined;

  const { mutateAsync: addToCart } = useAddToCart();

  const queryParams = useMemo(
    () => ({
      page: 1,
      limit: 100,
      search: searchQuery,
    }),
    [searchQuery],
  );

  // api call for backend
  const productsQuery = useGetAllProducts(queryParams, Boolean(searchQuery));
  const products = productsQuery.data ?? [];

  const handleAddToCart = async (id: string) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    await addToCart(id);
  };

  return (
    <div className="p-3 sm:p-5 dark:bg-black dark:text-white">
      <h2 className="text-lg sm:text-xl font-semibold py-3 sm:py-5">
        Results for "{searchQuery}"
      </h2>

      {productsQuery.isPending ? (
        <LoadingScreen content="Search Product Please Wait !" />
      ) : products.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {products.map((p: TProduct) => (
            <div
              key={p._id}
              className="p-2 sm:p-3 rounded flex flex-col justify-between"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-full h-32 sm:h-40 md:h-44 lg:h-48 object-contain sm:p-3 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => navigate(`/products/${p._id}`)}
                />
              </div>

              {/* DETAILS */}
              <div className="mt-2 space-y-1">
                <p className="text-xs sm:text-sm font-medium line-clamp-1">
                  {p.title}
                </p>

                <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1">
                  {p.brand}
                </p>

                <p className="text-[11px] sm:text-sm text-red-400">
                  {p.category.name}
                </p>
              </div>

              {/* BUTTON */}
              <div className="mt-3">
                <Button
                  content="Add To Cart"
                  pattern="outline"
                  className="w-full text-xs sm:text-sm py-1.5 sm:py-2 bg-white text-black border-2 border-black shadow-[4px_4px_0_0_#000] transition-all duration-200 dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
                  icons={{
                    right: <IoCartOutline className="size-4 sm:size-5" />,
                  }}
                  buttonProps={{
                    onClick: () => handleAddToCart(p._id),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyData content="No Product Found" />
      )}
    </div>
  );
};

export default SearchPage;
