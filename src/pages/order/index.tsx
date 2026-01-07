import { useNavigate } from "react-router-dom";
import { useGetOrder } from "../../api/order/service";
import type { IOrder } from "../../types";
import { Button } from "../../components/Button";
import EmptyData from "../../components/empty-data/EmptyData";

const AllOrder = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetOrder();

  /* ------------------ Guards ------------------ */
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-5 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-40 mx-auto" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        {error instanceof Error ? (
          error.message
        ) : (
          <EmptyData content="Orders Not Found" />
        )}
      </div>
    );
  }

  const orders: IOrder[] = data?.orders ?? [];

  const getOrderAmount = (order: IOrder) =>
    Number(order.totalPrice ?? order.order_result?.amount ?? 0);

  const getOrderStatus = (order: IOrder) =>
    order.order_result?.order_status?.toLowerCase() ?? "unknown";

  /* ------------------ UI ------------------ */
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-4xl font-extrabold text-center text-shadow-lg">
        MY ORDER
      </h1>

      {orders.length === 0 ? (
        <EmptyData
          content="No Orders Found 😕"
          className="h-[50vh] mx-auto [&>h3]:text-3xl"
        />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const status = getOrderStatus(order);
            const amount = getOrderAmount(order);

            return (
              <div
                key={order._id}
                className="rounded-tr-full  bg-white shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-bl from-pink-200 via-purple-300 to-orange-200 text-white"
              >
                {/* Top */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <div>
                    <p className="text-sm text-black">Order ID</p>
                    <h2 className="font-semibold text-red-500 text-lg">
                      #{order._id.slice(-6)}
                    </h2>
                  </div>

                  <OrderStatus status={status.toLowerCase()} />
                </div>

                {/* Body */}
                <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <Info label="Order Amount" value={`₹${amount}`} strong />
                  <Info
                    label="Order Date"
                    value={new Date(order.createdAt).toLocaleString()}
                  />
                  <Info
                    label="Payment Mode"
                    value={order.razorpay_payment_result?.payment_mode ?? "N/A"}
                  />
                  <Info
                    label="Items"
                    value={`${order.products?.length ?? 0} items`}
                  />
                </div>

                {/* Address */}
                <div className="px-6 pb-5 text-sm text-gray-500">
                  <strong className="text-gray-700">Delivery Address:</strong>{" "}
                  {order.address.address}, {order.address.city},{" "}
                  {order.address.state} - {order.address.pinCode}
                </div>

                {/* Footer */}
                <div className="px-8 py-3 flex justify-end">
                  <Button
                    content="View Order Details"
                    // pattern="primary"
                    className="rounded-lg bg-gradient-to-bl from-pink-300 via-purple-300 to-orange-300 text-black w-40!"
                    buttonProps={{
                      onClick: () => navigate(`/orders/${order._id}`),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllOrder;

/* ------------------ Small UI Blocks ------------------ */

const Info = ({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) => (
  <div>
    <p className="text-slate-400 text-xs uppercase tracking-wide">{label}</p>
    <p
      className={`mt-1 ${
        strong ? "font-semibold text-gray-900" : "font-medium text-gray-700"
      }`}
    >
      {value}
    </p>
  </div>
);

const OrderStatus = ({ status }: { status: string }) => {
  const base =
    "px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide";

  const map: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <span className={`${base} ${map[status] ?? "bg-green-200 text-green-600"}`}>
      {status}
    </span>
  );
};
