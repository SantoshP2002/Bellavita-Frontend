import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_order_By_Id } from "../../../api/order/api";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white">
      {/* HERO */}
      <div className="text-center py-20 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">
            Track Your Order
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Enter your order ID below to see real-time updates on your shipment
          and delivery status.
        </p>

        {/* NEEDLE LINE */}
        <span className="mx-auto mt-6 block h-[2px] w-[90%] lg:w-[70%] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
      </div>

      {/* TRACKING CARD */}
      <div className="max-w-xl mx-auto px-4 sm:px-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Order Tracking
          </h2>

          {/* INPUT */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                if (error) setError("");
              }}
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <button
              onClick={async () => {
                if (!orderId.trim()) {
                  setError("Order ID is required");
                  return;
                }

                try {
                  setLoading(true);
                  setError("");

                  const res = await get_order_By_Id(orderId);

                  if (!res?.order) {
                    setError("Order ID not found");
                    return;
                  }

                  navigate(`/orders/${orderId}`);
                } catch (err) {
                  console.log(err);

                  setError("Order ID not found");
                } finally {
                  setLoading(false);
                }
              }}
              className="px-6 py-3 rounded-md bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:opacity-90 transition cursor-pointer"
            >
              {loading ? "Checking..." : "Track Order"}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

          {/* INFO */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            Your order ID was sent to your registered email after purchase.
          </p>
        </div>
      </div>

      {/* ORDER STATUS */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mt-16 pb-20">
        <h3 className="text-xl font-semibold text-center mb-8">Order Status</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Order Placed", "Processing", "Shipped", "Out for Delivery"].map(
            (step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <p className="font-medium">{step}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
