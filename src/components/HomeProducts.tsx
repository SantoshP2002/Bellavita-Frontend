import { useGetAllProductsInfinite } from "../api/products/service";
import type { TProduct } from "../types";
import { Button } from "./Button";

const HomeProducts = () => {
  const { data, isLoading, isError, error } = useGetAllProductsInfinite(8);

  // ✅ First 8 products only
  const products = data?.pages?.flatMap((page) => page.products) || [];
  return (
    <div>
      {/* ✅ Horizontal Scroll Product Section */}
      <div className="mt-8">
        {isLoading && <p>Loading products...</p>}
        {isError && <p className="text-red-500">Error: {String(error)}</p>}

        {products.length > 0 && (
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {products.map((p: TProduct) => (
              <div
                key={p._id}
                className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 w-full bg-gray-100">
                  <img
                    src={p.images?.[0] || "/placeholder.png"}
                    alt={p.title}
                    className="w-full h-full object-contain p-4"
                  />

                  {p.price > p.sellingPrice && (
                    <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round(((p.price - p.sellingPrice) / p.price) * 100)}
                      % OFF
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs text-gray-500 font-medium">
                    {p.category}
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
                    className="mt-4 w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    buttonProps={
                      {
                        // onClick: () => handleAddToCart(p._id),
                      }
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <p className="text-center text-gray-600 text-lg mt-4">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}

export default HomeProducts
