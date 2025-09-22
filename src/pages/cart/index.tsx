import { useState } from "react";
import Footer from "../../components/footer";
import { useGetUserCart } from "../../api/cart/service";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Bella Vita Perfume",
      brand: "Bella Vita",
      price: 1499,
      sellingPrice: 999,
      quantity: 1,
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...",
    },
    {
      id: 2,
      title: "Skin Care Cream",
      brand: "Bella Vita",
      price: 799,
      sellingPrice: 599,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQLewAhR96yP-S-lRowh2q8cVb-HtJMyyLw&s",
    },
  ]);

  const { data } = useGetUserCart()
  console.log("getUserCart_Data", data);
  

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return <div>Failed to load cart</div>;
  // }
    

  // Quantity increase
  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Quantity decrease
  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.sellingPrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Section */}
      <div className="flex-1 p-4 sm:p-6 lg:p-12">
        <div className="h-full w-full bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left: Products */}
            <div className="lg:col-span-2 flex flex-col bg-gray-50 rounded-xl shadow p-4 sm:p-6 h-full">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Shopping Cart
              </h2>
              <div className="space-y-4 flex-1 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-4 rounded-xl shadow gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-red-500 font-bold">
                          ₹{item.sellingPrice}
                        </span>
                        <span className="text-gray-400 line-through">
                          ₹{item.price}
                        </span>
                      </div>
                      {/* Quantity Control */}
                      <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm mt-2 sm:mt-0">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow flex flex-col h-full">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2 text-sm sm:text-base">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm sm:text-base">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-base sm:text-lg mt-2 border-t pt-2">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="mt-auto">
                <button className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-xl hover:bg-indigo-700 transition text-sm sm:text-base">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
