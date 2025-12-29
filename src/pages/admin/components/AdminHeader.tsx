import { FaBars } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";

type AdminHeadersProps = {
  onMenuClick?: () => void;
};

const AdminHeader = ({ onMenuClick }: AdminHeadersProps) => {
  const navigate = useNavigate();
  return (
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
        <Button
          content="home/"
          className="underline text-indigo-500"
          buttonProps={{
            onClick: () => navigate("/"),
          }}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <span className="text-gray-600 hidden sm:block">Welcome, Admin 👋</span>
        <img
          src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-118143566.jpg"
          alt="Admin"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
};

export default AdminHeader;
