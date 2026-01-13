import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useGetAllProductsInfinite } from "../../api/products/service";
import { useEffect } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import EmptyData from "../../components/empty-data/EmptyData";
import LoadingScreen from "../../components/LoadingScreen";
import { Button } from "../../components/Button";
import Select from "../../components/Select";
import { SORT_DATA } from "../../constants";
import { IoIosArrowDown } from "react-icons/io";
import { useAddToCart } from "../../api/cart/service";
import { IoCartOutline } from "react-icons/io5";
import { useUserStore } from "../../store/user";

const AllProducts = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const { queryParams, setParams, removeParam } = useQueryParams();
  const { ref, inView } = useInView();

  const { mutateAsync: addToCart } = useAddToCart();

  const handleAddToCart = async (id: string) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    await addToCart(id);
  };

  const params = {
    limit: 8,
    ...(queryParams.category && {
      category: queryParams.category,
      subCategory: queryParams.subCategory,
    }),
    ...(queryParams.sortBy && { sortBy: queryParams.sortBy }),
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage, isError } =
    useGetAllProductsInfinite(params);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const products = data?.pages?.flatMap((page) => page.products) || [];
  const totalProducts = data?.pages?.[0]?.totalProducts || 0;

  const handleSortChange = (value: string) => {
    if (value) setParams({ sortBy: value });
    else removeParam("sortBy");
  };

  const handleFilter = () => {
    setParams({ category: "Perfume" });
  };

  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className="py-4 px-3 sm:px-6 md:px-12 lg:px-24 dark:bg-black dark:text-white">
      <p className="text-xl mt-3 sm:text-2xl text-center capitalize">
        -{" "}
        {queryParams.subCategory
          ? queryParams.subCategory.replace("_", " ")
          : "All Products"}{" "}
        -
      </p>

      {/* Filter and Sort Bar */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto justify-center sm:justify-start">
          {/* FILTER BUTTON */}
          <Button
            content="FILTER +"
            pattern="outline"
            className="!w-fit !h-9 text-sm px-4 py-1.5 rounded bg-black text-white! dark:bg-white dark:text-black!"
            buttonProps={{
              onClick: handleFilter,
            }}
          />
          {/* SORT SELECT OPTIONS */}
          <Select
            containerClassName="!w-40 sm:!w-50 !h-10 !m-1 cursor-pointer"
            icons={{
              right: {
                icon: <IoIosArrowDown className="text-base cursor-pointer" />,
              },
            }}
            selectProps={{
              onChange: (data) => handleSortChange(data.value),
              options: SORT_DATA,
              value: { name: "SORT BY", value: queryParams.sortBy || "" },
            }}
          />
        </div>

        <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1 sm:mt-0 dark:text-green-500">
          {totalProducts} Product{totalProducts !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <EmptyData content="Product Not Found " />
      ) : products.length > 0 ? (
        <div className="py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p, index) => {
            const isLastItem = index === products.length - 4;
            return (
              <div
                key={p._id}
                ref={isLastItem ? ref : null}
                className="w-full bg-white dark:bg-black rounded- overflow-hidden transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-60 md:h-72 w-full bg-gray-100">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    onClick={() => navigate(p?._id)}
                    className="w-full h-full object-contain p-3 sm:p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>

                {/* Details */}
                <div className="p-2 sm:p-3 dark:bg-black dark:text-white">
                  <p className="text-[10px] sm:text-xs text-gray-300 font-medium line-clamp-1">
                    {p.brand}
                  </p>
                  <h2 className="text-xs sm:text-sm mt-1 font-semibold line-clamp-1">
                    {p.title}
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-sm sm:text-base font-bold">
                      ₹{p.sellingPrice.toFixed(2)}
                    </p>
                    {p.price > p.sellingPrice && (
                      <p className="text-xs sm:text-sm text-gray-400 line-through">
                        ₹{p.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="py-1 px-3">
                  <Button
                    content="Add To Cart"
                    pattern="outline"
                    className=" bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
                    icons={{
                      right: <IoCartOutline className="size-5" />,
                    }}
                    buttonProps={{
                      onClick: () => handleAddToCart(p._id),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyData
          content={"No Product Found"}
          className="w-full h-[50dvh] mx-auto [&>h3]:text-base sm:[&>h3]:text-2xl [&>h3]:uppercase gap-5"
        />
      )}
    </div>
  );
};

export default AllProducts;
