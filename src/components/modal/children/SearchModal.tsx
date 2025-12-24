import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../utils";
import usePathParams from "../../../hooks/usePathParams";
import { useGetAllProducts } from "../../../api/products/service";
import Input from "../../Input";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import LoadingScreen from "../../LoadingScreen";

export interface Product {
  _id: string;
  title: string;
  brand: string;
  commonImages: string[];
  category: {
    name: string;
  };
}

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { navigate } = usePathParams();

  // ✅ debounce
  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value.trim());
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSetQuery(searchQuery);
  }, [searchQuery, debouncedSetQuery]);

  // ✅ ONLY params (no enabled here)
  const queryParams = useMemo(
    () => ({
      page: 1,
      limit: 5,
      search: debouncedQuery,
    }),
    [debouncedQuery]
  );

  // ✅ enabled ONLY here
  const productsQuery = useGetAllProducts(queryParams, Boolean(debouncedQuery));

  const products = productsQuery.data?.products ?? [];
  console.log("PRODUCTS2222", products);

  const handleSubmit = (id?: string) => {
    if (id) {
      navigate(`/product/${id}`);
    } else if (searchQuery.trim()) {
      navigate(`/search?search=${searchQuery.trim()}`);
    }
    onClose();
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 pt-2">
      {/* Search Input */}
      <Input
        icons={{
          left: {
            icon: (
              <IoSearchOutline className="stroke-tertiary w-4 h-4 md:w-5 md:h-5" />
            ),
          },
        }}
        inputProps={{
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
        <div className="flex items-center justify-between px-3 py-2 text-tertiary bg-white rounded shadow-sm mb-1">
          <span className="text-xs">
            Results for: <strong>{searchQuery}</strong>
          </span>
          <IoCloseOutline
            className="w-4 h-4 cursor-pointer"
            onClick={() => setSearchQuery("")}
          />
        </div>
      )}

      {/* Results */}
      <div className="flex flex-col flex-1 min-h-[235px] max-h-[350px] overflow-y-auto bg-white rounded shadow-inner">
        {productsQuery.isPending && debouncedQuery ? (
          <LoadingScreen />
        ) : products.length ? (
          <ul className="flex flex-col gap-1 p-1">
            {products.map((p: Product) => (
              <li
                key={p._id}
                className="flex gap-2 p-1 border rounded cursor-pointer hover:bg-gray-50"
                onClick={() => handleSubmit(p._id)}
              >
                <img
                  src={p.commonImages?.[0]}
                  alt={p.title}
                  className="w-8 h-8 rounded object-cover"
                />
                <div>
                  <p className="text-xs font-medium">{p.title}</p>
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
