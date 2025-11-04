import { useGetAdminOrder } from "../../../api/order/service";
import LoadingScreen from "../../../components/LoadingScreen";

interface Order {
  _id: string;
  user?: {
    email?: string;
    role?: string;
  };
}

const Orders = () => {
  const { data, isLoading, isError } = useGetAdminOrder();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500 animate-pulse">
        <LoadingScreen /> Loading Orders...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-4 animate-bounce">
        ❌ Failed to load orders.
      </div>
    );

  const orders: Order[] = data?.orders || [];

  console.log("ORDERS111", orders);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-wide">
        🧾 Admin Orders
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200 transition-transform duration-300 hover:scale-[1.01]">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-red-400 to-red-200 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold border-b border-gray-600">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold border-b border-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold border-b border-gray-600">
                Role
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`transition-all duration-300 hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 text-sm border-b">
                    <span>{order._id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm border-b">
                    {order.user?.email || (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.user?.role === "ADMIN"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.user?.role || "user"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-gray-500 py-10 text-sm italic"
                >
                  No orders found 💤
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Floating animation for empty / success UI */}
      <div className="mt-10 flex justify-center">
        <div className="text-gray-600 text-sm animate-fadeIn">
          Showing {orders.length} {orders.length === 1 ? "order" : "orders"} in
          total
        </div>
      </div>
    </div>
  );
};

export default Orders;
