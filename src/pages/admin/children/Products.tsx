import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";

const Products = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex justify-between items-center bg-red-200">
        <h3 className="">All Products</h3>
        <Button
          content="Upload Products"
          pattern="secondary"
          className="w-40! "
          buttonProps={{
            onClick: () => navigate("/admin/products/upload"),
          }}
        />
      </div>
      <div className="">
        <h3>All Products yaha honge</h3>
      </div>
    </div>
  );
};

export default Products;
