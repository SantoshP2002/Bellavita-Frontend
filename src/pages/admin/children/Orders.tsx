import { useGetAdminOrder } from "../../../api/order/service";
import EmptyData from "../../../components/empty-data/EmptyData";
import LoadingScreen from "../../../components/LoadingScreen";

interface IOrder {
  _id: string;
  user?: {
    email?: string;
    role?: string;
  };
}

const Orders = () => {
  const { data, isLoading, isError } = useGetAdminOrder();

  if (isLoading) return <LoadingScreen />;

  if (isError)
    return (
      <div className="mt-20">
        <EmptyData content="Fail To Load Order" />
      </div>
    );

  const orders: IOrder[] = data?.orders ?? [];

  return (
    <div className="p-4 md:p-8 min-h-screen rounded-xl bg-gray-100 dark:bg-black dark:text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        🧾 Admin Orders
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-bl from-pink-600 via-purple-400 to-orange-400 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`dark:bg-gray-700 dark:text-white ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">{order.user?.email || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.user?.role === "ADMIN"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.user?.role || "USER"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE / TABLET CARDS ================= */}
      <div className="md:hidden space-y-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="rounded-xl shadow p-4 bg-gradient-to-bl from-pink-300 via-purple-200 to-orange-200"
            >
              <p className="text-xs text-gray-400 mb-1 dark:text-black">
                #{index + 1}
              </p>

              <p className="text-sm text-black font-semibold break-all dark:text-purple-400">
                {order._id}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                📧 {order.user?.email || "N/A"}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  order.user?.role === "ADMIN"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.user?.role || "USER"}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No orders found 💤
          </div>
        )}
      </div>

      {/* FOOTER COUNT */}
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-green-400">
        Showing {orders.length} {orders.length === 1 ? "order" : "orders"}
      </div>
    </div>
  );
};

export default Orders;
