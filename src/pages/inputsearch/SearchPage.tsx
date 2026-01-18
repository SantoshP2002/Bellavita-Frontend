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

  const totalProducts = products.length;

  const handleAddToCart = async (id: string) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    await addToCart(id);
  };

  return (
    <div className="p-3 sm:p-5 dark:bg-black dark:text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300 py-3 sm:py-5">
          Result For :{" "}
          <span className="uppercase font-semibold bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 bg-clip-text text-transparent tracking-wide rounded shadow-md dark:shadow-white">
            “{searchQuery}”
          </span>
        </h2>

        <p className="dark:text-green-500 text-black">
          {totalProducts} Product{totalProducts !== 1 ? "s" : ""}{" "}
        </p>
      </div>

      {productsQuery.isPending ? (
        <LoadingScreen content="Search Product Please Wait !" />
      ) : products.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {products.map((p: TProduct) => (
            <div
              key={p._id}
              className="group p-3 sm:p-4 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40"
            >
              {/* IMAGE */}
              <div className="overflow-hidden rounded-lg bg-gray-50 dark:bg-neutral-800">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-full h-32 sm:h-40 md:h-44 lg:h-48 object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-110 cursor-pointer"
                  onClick={() => navigate(`/products/${p._id}`)}
                />
              </div>

              {/* DETAILS */}
              <div className="mt-3 space-y-1.5">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                  {p.title}
                </p>

                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                  {p.brand}
                </p>

                <p className="text-[11px] sm:text-xs font-medium text-indigo-500">
                  {p.category.name}
                </p>
              </div>

              {/* BUTTON */}
              <div className="mt-4">
                <Button
                  content="Add To Cart"
                  pattern="outline"
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
