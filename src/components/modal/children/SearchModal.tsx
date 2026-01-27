import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../utils";
import usePathParams from "../../../hooks/usePathParams";
import { useGetAllProducts } from "../../../api/products/service";
import Input from "../../Input";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import LoadingScreen from "../../LoadingScreen";
import type { TProduct } from "../../../types";

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { navigate } = usePathParams();

  // ✅ debounce
  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value.trim());
      }, 100),
    [],
  );

  useEffect(() => {
    debouncedSetQuery(searchQuery);
  }, [searchQuery, debouncedSetQuery]);

  // ✅ ONLY params (no enabled here)
  const queryParams = useMemo(
    () => ({
      page: 1,
      limit: 100,
      search: debouncedQuery,
    }),
    [debouncedQuery],
  );

  // ✅ enabled ONLY here
  const productsQuery = useGetAllProducts(queryParams, Boolean(debouncedQuery));

  const products = productsQuery.data ?? [];

  const handleSubmit = (id?: string) => {
    if (id) {
      navigate(`/products/${id}`);
    } else if (searchQuery.trim()) {
      navigate(`/search?search=${searchQuery.trim()}`);
    }
    onClose();
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 pt-2 animate-[fadeIn_0.25s_ease-out]">
      {/* Search Input */}

      <Input
        icons={{
          left: {
            icon: (
              <IoSearchOutline className="w-4 h-4 md:w-5 md:h-5 text-tertiary dark:text-white" />
            ),
          },
        }}
        className="dark:bg-black dark:border-white shadow-sm dark:shadow-white"
        inputProps={{
          className: "dark:text-white",
          autoFocus: true,
          placeholder: "Search products here...",
          value: searchQuery,
          type: "text",
          onChange: (e) => setSearchQuery(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && searchQuery.trim()) {
              handleSubmit();
            }
          },
        }}
      />

      {/* Query Info */}
      {searchQuery.trim() && (
        <div className="flex items-center justify-between px-3 py-2 text-tertiary rounded shadow-sm mb-1 transition-all duration-200 ease-out animate-[slideDown_0.2s_ease-out] dark:bg-black dark:border-white dark:shadow-white">
          <span className="text-xs dark:text-white">
            Results for: <strong>{searchQuery}</strong>
          </span>
          <IoCloseOutline
            className="w-4 h-4 cursor-pointer dark:text-white"
            onClick={() => setSearchQuery("")}
          />
        </div>
      )}

      {/* Results */}
      <div className="flex flex-col flex-1 min-h-[235px] max-h-[350px] overflow-y-auto rounded shadow-inner transition-opacity duration-200 dark:bg-black">
        {productsQuery.isPending && debouncedQuery ? (
          <LoadingScreen content="Search Modal Loading Please Wait !" />
        ) : products.length ? (
          <ul className="flex flex-col gap-1 p-1">
            {products.map((p: TProduct) => (
              <li
                key={p._id}
                className="flex gap-2 p-1 rounded cursor-pointer transition-all duration-150 hover:border-b-2 dark:hover:border-b-2 hover:border-r-2 dark:hover:border-r-2 dark:border-white dark:hover:bg-white hover:scale-[1.01] active:scale-[0.98] dark:hover:border-2"
                onClick={() => handleSubmit(p._id)}
              >
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-8 h-8 rounded object-cover transition-opacity duration-300 opacity-0 animate-[imgFade_0.3s_ease-out_forwards]"
                />
                <div>
                  <p className="text-xs font-medium hover:text-black  dark:text-white">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {p.brand} · {p.category.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : debouncedQuery ? (
          <div className="flex-1 flex items-center justify-center text-sm">
            No products found
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm">
            Search for products to view them here
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
