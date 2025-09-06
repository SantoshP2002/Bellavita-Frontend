import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useUserStore } from "../store/user";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useAuthCheck();
  const { isLoggedIn } = useUserStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-dvh w-dvw flex items-center justify-center p-4">
        <p className="text-2xl">Loading.....</p>
      </div>
    );
  }

  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
