import { useGetOrder } from "../../api/order/service";
import type { IOrder } from "../../types";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const AllOrder = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetOrder();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (isError) {
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong while fetching orders.";

    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{errMsg}</p>
      </div>
    );
  }

  const orders: IOrder[] = data?.orders || [];

  console.log("ORDERS", orders);

  const getOrderAmount = (order: IOrder) =>
    Number(order.totalPrice || order.order_result.amount);

  const getOrderStatus = (order: IOrder) =>
    order.order_result.order_status.toLowerCase();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="grid gap-5">
          {orders.map((order) => {
            const status = getOrderStatus(order);
            const amount = getOrderAmount(order);

            return (
              <div
                key={order._id}
                className="border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-300"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-lg">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      status === "paid"
                        ? "bg-green-100 text-green-700"
                        : status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status.toUpperCase()}
                  </span>
                </div>

                {/* Order Info */}
                <div className="text-gray-600 space-y-1 mb-3">
                  <p>
                    <strong>Amount:</strong> ₹{amount}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Payment Mode:</strong>{" "}
                    {order.razorpay_payment_result?.payment_mode}
                  </p>
                </div>

                {/* Address */}
                <div className="text-gray-500 text-sm mb-3">
                  <p>
                    <strong>Address:</strong> {order.address.address},{" "}
                    {order.address.city}, {order.address.state} -{" "}
                    {order.address.pinCode}
                  </p>
                </div>

                {/* Button */}
                <Button
                  content="View Details"
                  pattern="primary"
                  buttonProps={{
                    onClick: () => navigate(`/orders/${order._id}`),
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllOrder;
