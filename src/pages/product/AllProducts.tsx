import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useGetAllProductsInfinite } from "../../api/products/service";
import { useEffect } from "react";
import useQueryParams from "../../hooks/useQueryParams";
// import usePathParams from "../../hooks/usePathParams";

const AllProducts = () => {
  const navigate = useNavigate();
    const { queryParams } = useQueryParams();
    // const {} = usePathParams()
    console.log("queryParams", queryParams);
  const { ref, inView } = useInView();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isError } =
    useGetAllProductsInfinite({
      limit: 8,
      ...(queryParams?.category && {
        category: queryParams.category,
      }),
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) return <h1>{error.message}</h1>;
  const products = data?.pages?.flatMap((page) => page.products) || [];

  return (
    <div className="py-4 px-10">
      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Failed to load products</p>}

      {products.length === 0 ? (
        <p className="text-black mt-4 text-xl font-semibold">
          No products found
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, index) => {
            const isLastItem = index === products.length - 1;
            return (
              <div
                key={p._id}
                ref={isLastItem ? ref : null}
                onClick={() => navigate(p?._id)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative h-44 w-full bg-gray-100">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                <div className="p-4">
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
