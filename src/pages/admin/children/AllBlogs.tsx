import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../../../components/Button";

const AllBlogs = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-700">ALL BLOGS</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            content="UPLOAD BLOG"
            pattern="secondary"
            className="!w-50"
            icons={{
              right: <AiOutlineCloudUpload className="w-6 h-6" />,
            }}
            buttonProps={{
              onClick: () => navigate("upload"),
            }}
          />
        </div>
      </div>
      <hr className="my-4 underline-offset-0" />

      {/* start down all BLOGS  */}
    </div>
  );
};

export default AllBlogs;
