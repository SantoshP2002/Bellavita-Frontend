// import { useState } from "react";
import CartProducts from "../../components/cartProducts";
import Footer from "../../components/footer";

const Cart = () => {
  // Subtotal calculation
  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.sellingPrice * item.quantity,
  //   0
  // );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Section */}
      <CartProducts/>
      <Footer />
    </div>
  );
};

export default Cart;
