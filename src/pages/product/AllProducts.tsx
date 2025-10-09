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

const AllProducts = () => {
  const navigate = useNavigate();
  const { queryParams, setParams } = useQueryParams();
  const { ref, inView } = useInView();

  const { mutateAsync: addToCart } = useAddToCart();

  const handleAddToCart = (id: string) => {
    addToCart(id);
  };

  const params = {
    limit: 8,
    ...(queryParams.category && { category: queryParams.category }),
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

  // const totalProducts = data?.pages?.[0]?.totalProducts || 0;

  // handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setParams({ sortBy: value });
  };

  const handleFilter = () => {
    setParams({ category: "Perfume" });
  };

  if (isError) return <h1>{error.message}</h1>;
  return (
    <div className="py-4 px-25 ">
      <p className="text-3xl text-center">Bestseller</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <Button
            content="FILTER +"
            pattern="outline"
            className="!w-30 !h-10 text-sm px-4 py-2 rounded bg-black text-white"
            buttonProps={{
              onClick: () => handleFilter,
            }}
          />

          <Select
            placeholder="SORT BY"
            containerClassName="!w-50 !h-10 !m-1 cursor-pointer"
            options={SORT_DATA}
            icons={{
              right: {
                icon: <IoIosArrowDown className="text-base cursor-pointer" />,
              },
            }}
            selectProps={{
              onChange: handleSortChange,
              value: queryParams.sortBy || "",
            }}
          />
        </div>

        {/* <p className="text-sm text-gray-600 font-medium">
          {totalProducts} Product{totalProducts !== 1 && "s"}
        </p> */}
      </div>

      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <p className="text-red-500">Failed to load products</p>
      ) : products.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, index) => {
            const isLastItem = index === products.length - 1;
            return (
              <div className="bg-red-200">
                <div
                  key={p._id}
                  ref={isLastItem ? ref : null}
                  onClick={() => navigate(p?._id)}
                  className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <div className="relative h-44 w-full bg-gray-100">
                    <img
                      src={p.images?.[0]}
                      alt={p.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>

                  <div className="p-1">
                    <p className="text-xs text-gray-500 font-medium line-clamp-1">
                      {p.brand}
                    </p>
                    <h2 className="text-sm mt-1 font-semibold text-gray-800 line-clamp-1">
                      {p.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-lg font-bold text-black">
                        ₹{p.sellingPrice.toFixed(2)}
                      </p>
                      {p.price > p.sellingPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{p.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    content="Add To Cart"
                    pattern="outline"
                    className=" mt-5 lg:w-full rounded bg-black text-white"
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
          className="w-full h-[50dvh] mx-auto [&>h3]:text-base [&>h3]:base:text-base [&>h3]:sm:text-xl [&>h3]:md:text-2xl [&>h3]:lg:text-3xl [&>h3]:xl:text-4xl [&>h3]:uppercase gap-5"
        />
      )}
    </div>
  );
};

export default AllProducts;
