import { useParams } from "react-router-dom";
import { useGetOrderById } from "../../api/order/service";
import type { IOrder } from "../../types";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>(); // /orders/:id se milta hai
  const { data, isLoading, isError } = useGetOrderById(id!);

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load order</p>;

  const order: IOrder | undefined = data?.order;

  if (!order) {
    return <p className="text-center text-gray-600">Order not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>

      <div className="border rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-semibold text-lg mb-2">Order #{order._id}</h2>
        <p>
          <strong>Status:</strong> {order.order_result?.order_status ?? "N/A"}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.totalPrice}
        </p>
        <p>
          <strong>Payment:</strong>{" "}
          {order.razorpay_payment_result?.rzp_payment_status ?? "N/A"}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {order.createdAt
            ? new Date(order.createdAt).toLocaleString()
            : "Unknown"}
        </p>
      </div>

      {/* Product */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Products</h3>
        <div className="space-y-4">
          {order.products?.length ? (
            order.products.map((item: IOrder["products"][number]) => {
              const product = item.product;
              const image =
                product?.images?.[0] ||
                "https://via.placeholder.com/80?text=No+Image"; // fallback

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border rounded-lg p-4"
                >
                  <img
                    src={image}
                    alt={product?.title || "Product"}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">
                      {product?.title || "Untitled"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {product?.brand || "Unknown Brand"}
                    </p>
                    <p className="text-sm text-gray-700">
                      ₹{product?.sellingPrice ?? 0} × {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No products found in this order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
