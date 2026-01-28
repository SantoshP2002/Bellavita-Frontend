import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "../../../components/Button";
import {
  useDeleteProductById,
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

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const params = useMemo(
    () => ({
      limit: 8,
      search: debouncedSearch,
    }),
    [debouncedSearch],
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    refetch,
  } = useGetMyProductsInfinite(params);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, refetch]);

  if (isError) return <h1>{error.message}</h1>;
  const products = data?.pages?.flatMap((page) => page.products) || [];

  // Trigger delete modal
  const handleDelete = (id: string) => {
    setRemoveId(id);
    setConfirmOpen(true);
  };

  // Confirm actual delete
  const confirmDelete = () => {
    if (removeId) {
      deleteProductQuery.mutate(removeId);
    }
    setConfirmOpen(false);
    setRemoveId(null);
  };

  return (
    <div className="dark:bg-black dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold mt-20">ALL PRODUCTS</h3>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-10 mt-20">
          {/* 🔍 Search Bar */}
          <Input
            className="border-b-4 rounded-lg dark:bg-black dark:text-white dark:border-gray-200 dark:border-b-4 dark:border-r-4"
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
            className="w-60!"
            // className="w-40!"
            buttonProps={{
              onClick: () => navigate("/admin/products/upload"),
            }}
          />
        </div>
      </div>

      {/* CARD */}
      <div>
        {isLoading && (
          <p>
            <LoadingScreen content="Admin All Products Loading Please Wait !" />
          </p>
        )}
        {error && <p className="text-red-500">Failed to load products</p>}

        {products.length === 0 ? (
          <p className="text-black mt-4 text-xl font-semibold">
            No products found
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                  <div className="p-4 dark:bg-black dark:text-white">
                    <p className="text-xs text-gray-500 font-medium line-clamp-1">
                      {p.brand}
                    </p>
                    <h2 className="text-sm mt-1 font-semibold  line-clamp-1">
                      {p.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-lg font-bold">
                        ₹{p.sellingPrice.toFixed(2)}
                      </p>
                      {p.price > p.sellingPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{p.price.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-row gap-2 mt-4">
                      <Button
                        content="UPDATE"
                        pattern="outline"
                        className="rounded-lg"
                        buttonProps={{
                          onClick: () =>
                            navigate(`/admin/products/update/${p._id}`),
                        }}
                      />
                      <Button
                        pattern="outline"
                        content="DELETE"
                        className="rounded-lg"
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
      {/* ❗ Confirm Delete Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-black rounded-xl p-4 w-[90%] max-w-sm shadow-lg"
            >
              <div className="flex justify-center mb-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/12517/12517928.png"
                  className="w-16 h-16"
                />
              </div>

              <p className="text-sm text-center mb-4 dark:text-white">
                Are you sure you want to delete this product?
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  content="Cancel"
                  pattern="outline"
                  className="rounded-lg text-gray-700 bg-gradient-to-r from-gray-200 dark:from-gray-900 via-gray-100 dark:via-gray-700 to-gray-300 dark:to-gray-600 hover:from-gray-300 dark:hover:from-gray-600 hover:to-gray-300 dark:hover:to-gray-600 transition-all duration-300"
                  buttonProps={{
                    onClick: () => {
                      setConfirmOpen(false);
                      setRemoveId(null);
                    },
                  }}
                />

                <Button
                  content="DELETE"
                  pattern="outline"
                  className="rounded-lg bg-gradient-to-r from-purple-300 dark:from-purple-600 via-rose-300 dark:via-rose-600 to-red-200 bg-[length:200%_200%] hover:bg-[position:100%_50%] transition-all duration-300"
                  buttonProps={{
                    onClick: confirmDelete,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
