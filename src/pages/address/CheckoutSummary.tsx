import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserCart } from "../../api/cart/service";
import { useGetAddress } from "../../api/address/service";
import { Button } from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "axios";
import { getUserToken } from "../../utils";
import {
  VITE_BACKEND_URI,
  VITE_RAZORPAY_KEY_ID,
  VITE_RAZORPAY_KEY_SECRET,
} from "../../env";
import { useUserStore } from "../../store/user";
import type { IOrder, TProductCart } from "../../types";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CheckoutSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addressId } = (state as { addressId?: string }) || {};
  const { user } = useUserStore();

  const { data: addressData, isLoading: isAddressLoading } = useGetAddress();
  const { data: cartData, isLoading: isCartLoading } = useGetUserCart();

  const localPaymentKey = "pendingPaymentData";

  useEffect(() => {
    const savePayment = localStorage.getItem(localPaymentKey);
    if (savePayment) {
      const data = JSON.parse(savePayment);
      const resume = confirm("You have an unfinished payment. Resume it?");
      if (resume) {
        openRazorpay(data);
      } else {
        localStorage.removeItem(localPaymentKey);
      }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openRazorpay = (options: any) => {
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (isAddressLoading || isCartLoading) return <LoadingScreen />;

  const selectedAddress = addressData?.userAddress?.addresses?.find(
    (addr: IOrder) => addr._id === addressId
  );

  const products: TProductCart[] = cartData?.cart?.products || [];

  console.log("PRODUCTS", products);

  if (!selectedAddress) {
    return (
      <p className="text-center text-red-500 mt-10">
        Address not found. Please go back and select one.
      </p>
    );
  }

  const subtotal = products.reduce(
    (acc, item) => acc + item.product.sellingPrice * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      const token = getUserToken();
      const { data: orderData } = await axios.post(
        `${VITE_BACKEND_URI}/api/order/create`,
        {},
        {
          headers: { Authorization: token },
          params: { addressId },
        }
      );

      const options = {
        key: VITE_RAZORPAY_KEY_ID,
        key_secret: VITE_RAZORPAY_KEY_SECRET,
        amount: orderData.razorpayOrder.amount,
        currency: orderData.razorpayOrder.currency,
        name: "Bellavita",
        description: `Ordered By ${user?.firstName} ${user?.lastName}, with Razorpay secure payment gateway.`,
        image:
          "https://bellavitaorganic.com/cdn/shop/files/Bella_Vita_Logo_360_E_2x_d60de42b-fa50-45b3-b490-be70ac1fffa1.png?height=30&v=1716533001",
        order_id: orderData.razorpayOrder.id,
        handler: async function (response: Record<string, string>) {
          console.log("Response", response);
          try {
            // verify-payment api
            const { data: verifyData } = await axios.patch(
              `${VITE_BACKEND_URI}/api/order/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDBId: orderData.createOrder._id,
              },
              { headers: { Authorization: `Bearer ${getUserToken()}` } }
            );

            console.log("Razorpay response:", response);
            console.log("orderDBId:", orderData.createOrder._id);

            toast.success("Payment Successful!");
            console.log("PAyment Verified", verifyData);
            localStorage.removeItem(localPaymentKey);
            navigate("/orders");
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
        },
        theme: { color: "#6700EE" },
        modal: {
          ondismiss: async () => {
            const resp = await axios.request({
              url: `${VITE_BACKEND_URI}/api/order/cancel-payment/${orderData.createOrder._id}`,
              method: "PATCH",
              headers: {
                Authorization: getUserToken(),
              },
            });

            console.log("CANCEL PAYMENT RESPONSE", resp);
          },
        },
        method: {
          card: true,
          netbanking: true,
          upi: true,
          wallet: true,
          emi: false,
          payleter: false,
        },
      };

      localStorage.setItem(localPaymentKey, JSON.stringify(options));

      openRazorpay(options);
    } catch (error) {
      console.log(error);
      toast.error("Payment initiation failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800">
        Checkout Summary 🛍️
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Address Section */}
        <div className="bg-gradient-to-bl from-pink-400 via-violet-300 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
            Shipping Address
          </h2>

          <div className="space-y-2 text-gray-700 leading-relaxed">
            <p className="font-medium text-lg">{selectedAddress.name}</p>
            <p className="text-sm">{selectedAddress.phone}</p>
            <p className="text-sm">
              {selectedAddress.address}, {selectedAddress.city},{" "}
              {selectedAddress.state} - {selectedAddress.pinCode}
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="border border-gray-200 bg-gradient-to-bl from-pink-400 via-violet-300 to-blue-100 rounded-b-full shadow-lg hover:shadow-xl transition-all duration-300 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full"></span>
            Products
          </h2>

          <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
            {products.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 pb-4 rounded-lg transition-colors duration-200"
              >
                <img
                  src={item.product.images?.[0]}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover shadow"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.product.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    ₹{item.product.sellingPrice} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-12 items-center mt-6 text-lg font-semibold text-gray-800 border- pt-4">
            <span>Total:</span>
            <span className="text-red-500 text-xl">₹{subtotal}</span>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="flex justify-center mt-10">
        <Button
          content={
            <span className="flex items-center gap-2"> Make Payment</span>
          }
          pattern="outline"
          className="mt-4 bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all
                     duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000]"
          buttonProps={{ onClick: handlePayment }}
        />
      </div>
    </div>
  );
};

export default CheckoutSummary;
