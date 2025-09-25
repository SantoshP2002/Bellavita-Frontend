import { useAddToCart } from "../api/cart/service";
import { useGetAllProductsInfinite } from "../api/products/service";
import type { TProduct } from "../types";
import { Button } from "./Button";

const HomeProducts = () => {
  const { data, isLoading, isError, error } = useGetAllProductsInfinite(8);
  const { mutateAsync: addToCart } = useAddToCart();

  // ✅ First 8 products only
  const products = data?.pages?.flatMap((page) => page.products) || [];

  const handleAddToCart = (id: string) => {
    addToCart(id);
  };

  return (
    <div className="mt-8 px-4 md:px-10">
      {isLoading && <p>Loading products...</p>}
      {isError && <p className="text-red-500">Error: {String(error)}</p>}

      {products.length > 0 && (
        <div className="flex flex-col gap-8">
          {/* CONTENT HEADERS */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <h1 className="text-2xl font-bold text-black">BESTSELLER</h1>
            <span className="text-gray-400">|</span>
            <h1 className="text-2xl font-semibold text-gray-500">
              NEW ARRIVALS
            </h1>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {products.map((p: TProduct) => (
              <div
                key={p._id}
                className="flex flex-col gap-1 min-w-[280px] min-h-[440px] bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 w-full bg-gray-100">
                  <img
                    src={p.images?.[0] || "/placeholder.png"}
                    alt={p.title}
                    className="w-full h-full object-contain p-4"
                  />

                  {p.price > p.sellingPrice && (
                    <span className="absolute bottom-2 left-2 bg-red-400 text-white text-xs px-2 py-1 rounded-xs">
                      {Math.round(((p.price - p.sellingPrice) / p.price) * 100)}
                      % OFF
                    </span>
                  )}
                </div>

                <div className="grow flex flex-col justify-between p-4">
                  <p className="text-xs text-gray-500 font-medium line-clamp-1">
                    {p.brand}
                  </p>

                  <h2 className="text-sm mt-1 font-semibold text-gray-800 line-clamp-2">
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

                  <Button
                    content="Add to Cart"
                    className="mt-4 w-full bg-black text-white text-sm py-2 hover:bg-gray-800 transition-colors duration-300"
                    buttonProps={{
                      onClick: () => handleAddToCart(p._id),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {products.length === 0 && !isLoading && (
        <p className="text-center text-gray-600 text-lg mt-4">
          No products found
        </p>
      )}

      <Button
        content="VIEW - ALL"
        pattern="outline"
        className="!w-60 !h-12 text-sm font-semibold mt-4 mb-18 mx-auto rounded border"
      />
    </div>
  );
};

export default HomeProducts;
