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
        className="
                         bg-black text-white
                          border border-gray-300 hover:border-2
                          border-b-2 border-r-2 hover:border-b-4 hover:border-r-4 border-b-gray-500 border-r-gray-500
                          text-xs sm:text-sm
                          py-1 sm:py-2 px-3
                         hover:bg-white hover:text-black! hover:border-black"
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
