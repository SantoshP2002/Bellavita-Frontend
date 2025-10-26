import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  useDeleteCartProduct,
  useGetUserCart,
  useUpdateQuantityCartProduct,
} from "../api/cart/service";
import type { ICart, TProductCart } from "../types";
import { GoPlus } from "react-icons/go";
import { Button } from "./Button";
import { HiMinusSmall } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { FaArrowRight} from "react-icons/fa";
import QuillEditor from "./QuillEditor/QuillEditor";

const CartProducts = () => {
  const navigate = useNavigate();
  const { data } = useGetUserCart();
  // const cartItems: TProductCart = data?.cart?.products || [];
  const { mutateAsync: updateQuantity } = useUpdateQuantityCartProduct();
  const { mutateAsync: removeProduct } = useDeleteCartProduct();

  const [products, setProducts] = useState<TProductCart[]>([]);

  const cart: ICart = data?.cart || {};

  useEffect(() => {
    if (cart.products) {
      setProducts(cart.products);
    }
  }, [cart.products]);

  // Subtotal calculation
  const subtotal = useMemo(() => {
    return products.reduce(
      (acc, item) => acc + item?.product?.sellingPrice * item?.quantity,
      0
    );
  }, [products]);

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

  // deleteProduct
  const handleRemoveProductToCart = (id: string) => {
    removeProduct(id, {
      onSuccess() {
        setProducts((prev) => prev.filter((item) => item._id !== id));
      },
      onError() {
        setProducts(cart.products);
      },
    });
  };

  return (
    <div className="flex-1 p-2 sm:p-4 lg:p-12">
      <div className="h-full w-full bg-white rounded-2xl p-2 sm:p-4 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-full">
          {/* Left: Products */}
          <div
            className={`${
              products && products.length > 0
                ? "lg:col-span-2"
                : "lg:col-span-3"
            } flex flex-col bg-gray-50 rounded-xl p-2 sm:p-4 h-full`}
          >
            <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">
              Shopping Cart
            </h2>

            <div className="space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {products && products.length > 0 ? (
                  products.map((item) => {
                    const product = item.product;
                    const allowDec = item.quantity > 1;
                    const allowInc = item.quantity < 5;

                    return (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col sm:flex-row items-center sm:items-start p-3 sm:p-4 rounded-xl shadow gap-3 sm:gap-4 bg-white hover:shadow-lg transition"
                      >
                        <motion.img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                          whileHover={{ scale: 1.05 }}
                        />
                        <div className="flex-1 text-center sm:text-left flex flex-col gap-1.5">
                          <h3 className="text-sm sm:text-base font-semibold line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {product.brand}
                          </p>
                          <div className="flex items-center justify-center sm:justify-start gap-2">
                            <span className="text-red-500 font-bold text-sm sm:text-base">
                              ₹{product.sellingPrice}
                            </span>
                            <span className="text-gray-400 line-through text-xs sm:text-sm">
                              ₹{product.price}
                            </span>
                          </div>
                          {/* Quantity Control */}
                          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                            <Button
                              pattern="tertiary"
                              content={<HiMinusSmall />}
                              className="!w-6 !h-6 sm:!w-5 sm:!h-5 !p-0 !rounded-full hover:!bg-red-700"
                              buttonProps={{
                                onClick: () =>
                                  handleQuantityChange(
                                    item._id,
                                    item.quantity - 1
                                  ),
                                disabled: !allowDec,
                              }}
                            />
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                              className="text-sm font-semibold"
                            >
                              {item.quantity}
                            </motion.span>
                            <Button
                              pattern="tertiary"
                              content={<GoPlus />}
                              className="!w-6 !h-6 sm:!w-5 sm:!h-5 !p-0 !rounded-full"
                              buttonProps={{
                                onClick: () =>
                                  handleQuantityChange(
                                    item._id,
                                    item.quantity + 1
                                  ),
                                disabled: !allowInc,
                              }}
                            />
                          </div>
                        </div>
                        <Button
                          content="Remove"
                          className="!w-fit !p-0 text-red-500 hover:text-red-700 text-xs sm:text-sm mt-2 sm:mt-0"
                          buttonProps={{
                            onClick: () => handleRemoveProductToCart(item._id),
                          }}
                        />
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-center items-center h-full text-center"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-gray-600 mb-3">
                      🛒 Your Cart Is Empty!
                    </p>
                    <Button
                      content="Continue Shopping"
                      className="px-6 py-2 !w-50 text-white rounded-lg hover:bg-indigo-700 transition"
                      pattern="secondary"
                      buttonProps={{
                        onClick: () => {
                          navigate("/");
                        },
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Summary  */}
          <AnimatePresence>
            {products && products.length > 0 && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 p-3 sm:p-6 rounded-xl shadow flex flex-col h-full mt-4 lg:mt-0"
              >
                <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">
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
                <Button
                  content="Continue"
                  pattern="secondary"
                  className="mt-4 hover:scale-105 gap-1"
                  icons={{ right: <FaArrowRight /> }}
                  buttonProps={{
                    onClick: () => navigate("/address"),
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <QuillEditor/>
      </div>
    </div>
  );
};

export default CartProducts;
