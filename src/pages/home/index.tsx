import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { useGetAllProducts } from "../../api/products/service";
import type { TProduct } from "../../types";
// import { useAddToCart } from "../../api/cart/service";
// import { useUserStore } from "../../store/user";

const images = [
  "https://bellavitaorganic.com/cdn/shop/files/Summer-Banner-1920x720.webp?v=1745321335&width=1920",
  "https://bellavitaorganic.com/cdn/shop/articles/Perfect_Perfume_Gift_Sets_for_Any_Occasion.jpg?v=1684929262&width=1500",
  "https://bellavitaorganic.com/cdn/shop/files/Offer-Banner-2-UPB.webp?v=1727436765&width=1920",
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  // const { isLoggedIn } = useUserStore();

  // ✅ Fetch all products
  const { data: products, isLoading, isError, error } = useGetAllProducts();

  // Cart Mutation
  // const { mutateAsync: addToCart } = useAddToCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle AddToCart

  // Handle LoginSuccess
  // const handleLoginSuccess = (userData: IUser) => {
  //   // ✅ Store user
  //   setUser(userData);

  //   // ✅ Close popup
  //   setShowLoginPopup(false);

  //   // ✅ Agar pending product hai → add to cart
  //   if (pendingProduct) {
  //     addToCart({ productId: pendingProduct, quantity: 1 });
  //     setPendingProduct(null);
  //   }
  // };

  // ✅ First 8 products only
  const firstEight = products?.slice(0, 8) || [];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Carousel */}
      <div className="mt-10 relative overflow-hidden h-[400px] rounded-2xl shadow-lg">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              index === current
                ? "opacity-100"
                : "opacity-0 absolute top-0 left-0"
            }`}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2 mb-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index === current ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Content Header */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <h1 className="text-2xl font-bold text-black">BESTSELLER</h1>
        <span className="text-gray-400">|</span>
        <h1 className="text-2xl font-semibold text-gray-500">NEW ARRIVALS</h1>
      </div>

      {/* ✅ Horizontal Scroll Product Section */}
      <div className="mt-8">
        {isLoading && <p>Loading products...</p>}
        {isError && <p className="text-red-500">Error: {String(error)}</p>}

        {firstEight.length > 0 && (
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {firstEight.map((p: TProduct) => (
              <div
                key={p._id}
                className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
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

                {/* Details */}
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

        {/* If no products */}
        {firstEight.length === 0 && !isLoading && (
          <p className="text-center text-gray-600 text-lg mt-4">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
