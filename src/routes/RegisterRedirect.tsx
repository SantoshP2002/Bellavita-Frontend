import { Navigate, useLocation } from "react-router-dom";
import Register from "../pages/auth/Register";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useUserStore } from "../store/user";

const RegisterRedirect = () => {
  const { isLoggedIn } = useUserStore();
  const { isLoading } = useAuthCheck();
  const location = useLocation();

  if (isLoading)
    return (
      <div className="h-dvh w-dvw flex items-center justify-center p-4">
        <p className="text-2xl">Loading.....</p>
      </div>
    );

  if (isLoggedIn) {
    const state = location.state as { from?: { pathname?: string } } | null;
    const from = state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Register />;
};

export default RegisterRedirect;
