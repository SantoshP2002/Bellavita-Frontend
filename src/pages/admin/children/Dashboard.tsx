import { useGetUser } from "../../../api/user/service";
import { useGetAllProductsInfinite } from "../../../api/products/service";
import { useGetBlog } from "../../../api/blog/service";

const Dashboard = () => {
  const { data: userData, isLoading: userLoading } = useGetUser();

  const { data: productData, isLoading: productLoading } =
    useGetAllProductsInfinite({ limit: 1000 });

  const { data: blogData, isLoading: blogLoading } = useGetBlog();

  // USER COUNT
  const usersCount = userData?.user ? 1 : 0;

  // PRODUCT COUNT
  const productsCount =
    productData?.pages?.reduce(
      (total, page) => total + page.products.length,
      0
    ) ?? 0;

  // ✅ BLOG COUNT
  const blogsCount = blogData?.blog?.length ?? 0;

  return (
    <div className="w-full">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* USERS */}
        <div className="p-6 rounded-xl shadow-md bg-orange-300">
          <h2 className="text-gray-600">Users</h2>
          <p className="text-2xl font-bold">
            {userLoading ? "..." : usersCount}
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="p-6 rounded-xl shadow-md bg-yellow-300">
          <h2 className="text-gray-600">Products</h2>
          <p className="text-2xl font-bold">
            {productLoading ? "..." : productsCount}
          </p>
        </div>

        {/* BLOGS */}
        <div className="p-6 rounded-xl shadow-md bg-blue-300">
          <h2 className="text-gray-600">Blogs</h2>
          <p className="text-2xl font-bold">
            {blogLoading ? "..." : blogsCount}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
