import { Navigate, useLocation } from "react-router-dom";
import Login from "../pages/auth/Login";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useUserStore } from "../store/user";
import LoadingScreen from "../components/LoadingScreen";

const LoginRedirect = () => {
  const { isLoggedIn } = useUserStore();
  const { isLoading } = useAuthCheck();
  const location = useLocation();

  if (isLoading) return <LoadingScreen />;

  if (isLoggedIn) {
    const state = location.state as { from?: { pathname?: string } } | null;
    const from = state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Login />;
};

export default LoginRedirect;
