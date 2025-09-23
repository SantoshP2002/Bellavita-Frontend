import { useEffect, useState } from "react";
import {
  useGetUserCart,
  useUpdateQuantityCartProduct,
} from "../api/cart/service";
import type { ICart, TProductCart } from "../types";
import { GoPlus } from "react-icons/go";
import { Button } from "./Button";
import { HiMinusSmall } from "react-icons/hi2";

const CartProducts = () => {
  const { data } = useGetUserCart();
  //   const cartItems = data?.cart?.products || [];
  const { mutateAsync: updateQuantity } = useUpdateQuantityCartProduct();

  const [products, setProducts] = useState<TProductCart[]>([]);

  const cart: ICart = data?.cart || {};

  useEffect(() => {
    if (cart.products) {
      setProducts(cart.products);
    }
  }, [cart.products]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setProducts((prevProduct) =>
      prevProduct.map((product) =>
        product._id === id ? { ...product, quantity: newQuantity } : product
      )
    );
    updateQuantity(
      { _id: id, quantity: newQuantity },
      { onError: () => setProducts(cart.products) }
    );
  };
  return (
    <div>
      <div className="flex-1 p-4 sm:p-6 lg:p-12">
        <div className="h-full w-full bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left: Products */}
            <div className="lg:col-span-2 flex flex-col bg-gray-50 rounded-xl shadow p-4 sm:p-6 h-full">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Shopping Cart
              </h2>
              <div className="space-y-4 flex-1 overflow-y-auto">
                {products?.map((item) => {
                  const product = item.product;
                  const allowDec = item.quantity > 1;
                  const allowInc = item.quantity < 5;

                  return (
                    <div
                      key={product._id}
                      className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-4 rounded-xl shadow gap-4"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-center sm:text-left flex flex-col gap-1.5">
                        <h3 className="text-sm sm:text-base font-semibold line-clamp-1 leading-none">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span className="text-red-500 font-bold text-sm">
                            ₹{product.sellingPrice}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            ₹{product.price}
                          </span>
                        </div>
                        {/* Quantity Control */}
                        <div className="flex items-center gap-2">
                          <Button
                            pattern="tertiary"
                            content={<HiMinusSmall />}
                            className="!w-5 !h-5 !p-0 !rounded-full  hover:!bg-red-700"
                            buttonProps={{
                              onClick: () => {
                                handleQuantityChange(
                                  item._id,
                                  item.quantity - 1
                                );
                              },
                              disabled: !allowDec,
                            }}
                          />
                          <span className="text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            pattern="tertiary"
                            content={<GoPlus />}
                            className="!h-5 !w-5 !p-0 !rounded-full"
                            buttonProps={{
                              onClick: () => {
                                handleQuantityChange(
                                  item._id,
                                  item.quantity + 1
                                );
                              },
                              disabled: !allowInc,
                            }}
                          />
                        </div>
                      </div>
                      <button className="text-red-500 hover:text-red-700 text-sm mt-2 sm:mt-0 cursor-pointer">
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Summary */}
            {/* <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow flex flex-col h-full">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
