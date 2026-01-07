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
import { getUserToken } from "../../utils";

const AllProducts = () => {
  const navigate = useNavigate();
  const { queryParams, setParams, removeParam } = useQueryParams();
  const { ref, inView } = useInView();

  const { mutateAsync: addToCart } = useAddToCart();

  const handleAddToCart = async (id: string) => {
    const token = getUserToken();
    if (!token) {
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
    <div className="py-4 px-3 sm:px-6 md:px-12 lg:px-24">
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
          <Button
            content="FILTER +"
            pattern="outline"
            className="!w-fit !h-9 text-sm px-4 py-1.5 rounded bg-black text-white"
            buttonProps={{
              onClick: handleFilter,
            }}
          />

          <Select
            containerClassName="!w-40 sm:!w-50 !h-9 !m-1 cursor-pointer"
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

        <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1 sm:mt-0">
          {totalProducts} Product{totalProducts !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <p className="text-red-500">Failed to load products</p>
      ) : products.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p, index) => {
            const isLastItem = index === products.length - 4;
            return (
              <div
                key={p._id}
                ref={isLastItem ? ref : null}
                className="w-full bg-white rounded-xl overflow-hidden
             transition-shadow duration-300 shadow-sm hover:shadow-md"
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
                <div className="p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium line-clamp-1">
                    {p.brand}
                  </p>
                  <h2 className="text-xs sm:text-sm mt-1 font-semibold text-gray-800 line-clamp-1">
                    {p.title}
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-sm sm:text-base font-bold text-black">
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
                <div className="p-2">
                  <Button
                    content="Add To Cart"
                    pattern="outline"
                    className="
                         bg-black text-white
                          border border-gray-300 hover:border-2
                          border-b-2 border-r-2 hover:border-b-4 hover:border-r-4 border-b-gray-500 border-r-gray-500
                          text-xs sm:text-sm
                          py-1 sm:py-2 px-3
                         hover:bg-white hover:text-black! hover:border-black"
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
