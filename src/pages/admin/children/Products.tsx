import { useInView } from "react-intersection-observer";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import {
  useDeleteProductById,
  // useGetAllProductsInfinite,
  useGetMyProductsInfinite,
} from "../../../api/products/service";
import { useDebounce } from "../../../hooks/useDebounce";
import Input from "../../../components/Input";
import { CiSearch } from "react-icons/ci";
import LoadingScreen from "../../../components/LoadingScreen";

const Products = () => {
  const deleteProductQuery = useDeleteProductById();
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductQuery.mutate(id);
    }
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    refetch,
  } = useGetMyProductsInfinite({ limit: 8, search: debouncedSearch });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, refetch]);

  if (isError) return <h1>{error.message}</h1>;
  const products = data?.pages?.flatMap((page) => page.products) || [];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-700">ALL PRODUCTS</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* 🔍 Search Bar */}
          <Input
            className="border-b-4 rounded-lg"
            icons={{ left: { icon: <CiSearch /> } }}
            inputProps={{
              type: "text",
              placeholder: "Search by title, brand, or category...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
            }}
          />
          <Button
            content="Upload Products"
            pattern="secondary"
            className="w-60! bg-gradient-to-bl from-pink-600 via-purple-400 to-orange-400"
            // className="w-40!"
            buttonProps={{
              onClick: () => navigate("/admin/products/upload"),
            }}
          />
        </div>
      </div>

      <hr className="my-4 underline-offset-0" />

      {/* CARD */}
      <div className="mt-4">
        {isLoading && (
          <p>
            <LoadingScreen />
          </p>
        )}
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
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-44 w-full bg-gray-100">
                    <img
                      src={p.images?.[0] || "/placeholder.png"}
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

                    <div className="flex flex-row gap-2">
                      <Button
                        content="Update"
                        className="mt-4 w-full text-sm py-2 rounded-lg transition-colors duration-300 bg-gradient-to-bl from-pink-600 via-purple-400 to-orange-400"
                        buttonProps={{
                          onClick: () =>
                            navigate(`/admin/products/update/${p._id}`),
                        }}
                      />
                      <Button
                        pattern="secondary"
                        content="Delete"
                        className="mt-4 w-full text-sm py-2 rounded-lg bg-gradient-to-bl from-pink-600 via-purple-400 to-orange-400"
                        buttonProps={{
                          onClick: () => handleDelete(p._id),
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
