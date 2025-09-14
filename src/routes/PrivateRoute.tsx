import { useEffect, type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useUserStore } from "../store/user";
import { removeLocalToken } from "../utils";
import LoadingScreen from "../components/LoadingScreen";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoading, isError } = useAuthCheck();
  const { isLoggedIn, logout } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    if (isError) {
      removeLocalToken();
      logout();
    }
  }, [isError, logout]);

  if (isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
