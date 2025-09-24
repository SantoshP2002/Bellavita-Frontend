// import { useState } from "react";
import CartProducts from "../../components/cartProducts";
import Footer from "../../components/footer";

const Cart = () => {
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Section */}
      <CartProducts/>
      <Footer />
    </div>
  );
};

export default Cart;
