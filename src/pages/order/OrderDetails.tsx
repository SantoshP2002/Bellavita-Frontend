import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderById } from "../../api/order/service";
import type { IOrder } from "../../types";
import { Button } from "../../components/Button";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ORDER_STEPS } from "../../constants";

const STATUS_COLOR_MAP: Record<string, string> = {
  paid: "text-green-600",
  confirmed: "text-green-600",
  shipped: "text-blue-600",
  delivered: "text-green-700",
  pending: "text-yellow-600",
  failed: "text-red-600",
};

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
    <div className="w-full mx-auto px-8 py-8 space-y-8 dark:bg-black dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-3xl font-bold text-center mb-6 
               bg-gradient-to-r from-blue-400 to-purple-700 
               text-transparent bg-clip-text"
        >
          Order Details
        </h1>
        <Button
          content="Back To Order"
          pattern="outline"
          className="w-50! mt-4 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3
               shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out"
          icons={{
            left: <FaLongArrowAltLeft />,
          }}
          buttonProps={{
            onClick: () => navigate("/orders"),
          }}
        />
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-br-full p-6 dark:bg-black shadow-md dark:shadow-white shadow-black text-white">
        <Info label="Order ID" value={order._id} />
        <Info
          label="Order Date"
          value={
            order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"
          }
        />
        <Info
          label="Status"
          value={
            order.order_result?.order_status
              ?.toLowerCase()
              .replace("_", " ")
              .toUpperCase() ?? "N/A"
          }
          color={STATUS_COLOR_MAP[currentStatus]}
        />

        <Info
          label="Payment"
          value={order.razorpay_payment_result?.rzp_payment_status ?? "N/A"}
        />
        <Info label="Total Amount" value={`₹${order.totalPrice ?? 0}`} bold />
      </div>

      {/* Products + Order Tracking Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= PRODUCTS (LEFT - BIG) ================= */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Products</h2>

          {order.products && order.products.length > 0 ? (
            <div className="divide-y rounded-xl bg-white dark:bg-black shadow-md shadow-black dark:shadow-white">
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
                      className="w-16 h-16 rounded-lg object-cover border"
                      loading="lazy"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-black dark:text-white">
                        {product?.title ?? "Untitled Product"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product?.brand ?? "Unknown brand"}
                      </p>

                      <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        ₹{product?.sellingPrice ?? 0} × {item.quantity ?? 1}
                      </div>

                      <div className="text-sm pt-1 font-semibold dark:text-white">
                        TOTAL : ₹
                        {(product?.sellingPrice ?? 0) * (item.quantity ?? 1)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No products found in this order.</p>
          )}
        </div>

        {/* ================= ORDER TRACKING (RIGHT - SMALL) ================= */}
        <div className="space-y-4">
          <div className="rounded-2xl p-4 dark:bg-black shadow-md shadow-black dark:shadow-white h-full">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
              Order Tracking
            </h2>

            {/* ===== DESKTOP / TABLET ===== */}
            <div className="hidden lg:block space-y-5">
              {ORDER_STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;

                return (
                  <div key={step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold
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
                          className={`w-1 h-8 mt-1 rounded ${
                            isCompleted ? "bg-green-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>

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

            {/* ===== MOBILE ===== */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between">
                {ORDER_STEPS.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;

                  return (
                    <div
                      key={step}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold
                  ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                      >
                        {index + 1}
                      </div>

                      <p
                        className={`mt-1 text-[10px] capitalize ${
                          isCompleted ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
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
  // highlight,
  color,
}: {
  label: string;
  value: string;
  bold?: boolean;
  color?: string;
  highlight?: boolean;
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`mt-1 ${
          bold ? "font-bold" : "font-medium"
        } ${color ?? "text-gray-700 dark:text-gray-300"}`}
      >
        {value}
      </p>
    </div>
  );
};
