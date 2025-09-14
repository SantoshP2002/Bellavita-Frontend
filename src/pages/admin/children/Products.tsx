import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import {
  useDeleteProductById,
  useGetAllProducts,
} from "../../../api/products/service";
import type { TProduct } from "../../../types";
const Products = () => {
  const deleteProductQuery = useDeleteProductById();
  const navigate = useNavigate();
  const { data: products = [], isLoading, error } = useGetAllProducts();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductQuery.mutate(id);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-700">ALL PRODUCTS</h3>
        <Button
          content="Upload Products"
          pattern="secondary"
          className="w-40! "
          buttonProps={{
            onClick: () => navigate("/admin/products/upload"),
          }}
        />
      </div>
      <hr className="my-4 underline-offset-0" />
      {/* CARD */}
      <div className="mt-4">
        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Failed to load products</p>}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((p: TProduct) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative h-44 w-full bg-gray-100">
                <img
                  src={p.productImages?.[0] || "/placeholder.png"}
                  alt={p.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              {/* Details */}
              <div className="p-4">
                <p className="text-xs text-gray-500 font-medium">{p.brand}</p>
                <h2 className="text-sm mt-1 font-semibold text-gray-800">
                  {p.title}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-lg font-bold text-black">
                    ₹{p.sellingPrice.toFixed(2)}
                  </p>
                  {p.price > p.sellingPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      ₹{p.price.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  <Button
                    content="Update"
                    className="mt-4 w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    buttonProps={{
                      onClick: () =>
                        navigate(`/admin/products/update/${p._id}`),
                    }}
                  />
                  <Button
                    pattern="secondary"
                    content="Delete"
                    className="mt-4 w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    buttonProps={{
                      onClick: () => handleDelete(p._id),
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
