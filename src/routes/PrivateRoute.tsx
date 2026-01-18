import { Navigate, useLocation } from "react-router-dom";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useUserStore } from "../store/user";
import LoadingScreen from "../components/LoadingScreen";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoading} = useAuthCheck();
  const { isLoggedIn } = useUserStore();
  const location = useLocation();



  if (isLoading) {
    return (
      <LoadingScreen content="Private Route Loading Please Wait !"/>
    );
  }

  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
