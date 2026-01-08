import { FaBars, FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";

type AdminHeadersProps = {
  onMenuClick?: () => void;
};

const AdminHeader = ({ onMenuClick }: AdminHeadersProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        content="Back To Home"
        icons={{
          right: <FaLongArrowAltRight />,
        }}
        pattern="outline"
        className="w-40! mt-4 bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all
                     duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000]"
        buttonProps={{
          onClick: () => navigate("/"),
        }}
      />
      <header className="flex justify-between items-center p-4 border-b">
        {/* Left Section */}

        <div className="flex items-center gap-3">
          <Button
            content={<FaBars size={22} />}
            buttonProps={{
              onClick: onMenuClick,
              className: "md:hidden text-gray-700",
            }}
          />
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <span className="text-gray-600 hidden sm:block">
            Welcome, Admin 👋
          </span>
          <img
            src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-118143566.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
