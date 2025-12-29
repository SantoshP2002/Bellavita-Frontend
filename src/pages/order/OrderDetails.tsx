import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderById } from "../../api/order/service";
import type { IOrder } from "../../types";
import { Button } from "../../components/Button";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ORDER_STEPS } from "../../constants";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetOrderById(id ?? "");

  /* ------------------ Guards ------------------ */
  if (!id) {
    return (
      <div className="text-center text-red-600 py-10">Invalid order id</div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 py-10">Failed to load order</div>
    );
  }

  const order: IOrder | null = data?.order ?? null;

  if (!order) {
    return (
      <div className="text-center text-gray-600 py-10">Order not found</div>
    );
  }

  // order tracking
  const currentStatus =
    order.order_result?.order_status?.toLowerCase() ?? "pending";

  // const currentStepIndex = ORDER_STEPS.indexOf(currentStatus);
  const currentStepIndex = Math.max(0, ORDER_STEPS.indexOf(currentStatus));

  /* ------------------ UI ------------------ */
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Button
          content="Back To Order"
          pattern="tertiary"
          className="w-40! underline"
          icons={{
            left: <FaLongArrowAltLeft />,
          }}
          buttonProps={{
            onClick: () => navigate("/orders"),
          }}
        />
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-2xl p-6 bg-white shadow-sm">
        <Info label="Order ID" value={order._id} />
        <Info
          label="Order Date"
          value={
            order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"
          }
        />
        <Info
          label="Status"
          value={order.order_result?.order_status ?? "N/A"}
          highlight
        />
        <Info
          label="Payment"
          value={order.razorpay_payment_result?.rzp_payment_status ?? "N/A"}
        />
        <Info label="Total Amount" value={`₹${order.totalPrice ?? 0}`} bold />
      </div>

      {/* Products */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Products</h2>

        {order.products && order.products.length > 0 ? (
          <div className="divide-y rounded-2xl border bg-white shadow-sm">
            {order.products.map((item, index) => {
              const product = item.product;

              const image =
                typeof product?.images?.[0] === "string"
                  ? product.images[0]
                  : "/placeholder.png";

              return (
                <div key={item._id ?? index} className="flex gap-4 p-4">
                  <img
                    src={image}
                    alt={product?.title ?? "Product"}
                    className="w-20 h-20 rounded-lg object-cover border"
                    loading="lazy"
                  />

                  <div className="flex-1">
                    <p className="font-medium">
                      {product?.title ?? "Untitled Product"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {product?.brand ?? "Unknown brand"}
                    </p>

                    <div className="mt-1 text-sm text-gray-700">
                      ₹{product?.sellingPrice ?? 0} × {item.quantity ?? 1}
                    </div>
                  </div>

                  <div className="text-right text-sm font-medium">
                    ₹{(product?.sellingPrice ?? 0) * (item.quantity ?? 1)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No products found in this order.</p>
        )}

        <div className="border rounded-2xl p-4 md:p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Order Tracking</h2>

          {/* ================= DESKTOP (HORIZONTAL) ================= */}
          <div className="hidden md:flex items-center justify-between">
            {ORDER_STEPS.map((step, index) => {
              const isCompleted = index <= currentStepIndex;

              return (
                <div key={step} className="flex-1 flex items-center">
                  {/* Circle */}
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
              ${
                isCompleted
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
                  >
                    {index + 1}
                  </div>

                  {/* Label */}
                  <p
                    className={`ml-2 text-sm capitalize ${
                      isCompleted ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>

                  {/* Line */}
                  {index !== ORDER_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-3 rounded ${
                        isCompleted ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ================= MOBILE / TABLET (VERTICAL) ================= */}
          <div className="md:hidden space-y-4">
            {ORDER_STEPS.map((step, index) => {
              const isCompleted = index <= currentStepIndex;

              return (
                <div key={step} className="flex items-start gap-4">
                  {/* Left indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
                    >
                      {index + 1}
                    </div>

                    {index !== ORDER_STEPS.length - 1 && (
                      <div
                        className={`w-1 h-10 mt-1 rounded ${
                          isCompleted ? "bg-green-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div>
                    <p
                      className={`text-sm font-medium capitalize ${
                        isCompleted ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {step}
                    </p>

                    <p className="text-xs text-gray-500">
                      {isCompleted ? "Completed" : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

/* ------------------ Reusable UI ------------------ */

const Info = ({
  label,
  value,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`mt-1 ${bold ? "font-bold" : "font-medium"} ${
          highlight ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
};
