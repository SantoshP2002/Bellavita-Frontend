import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import RegisterRedirect from "./RegisterRedirect";
import LoginRedirect from "./LoginRedirect";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginRedirect /> },
  { path: "/register", element: <RegisterRedirect /> },
]);

export default router;
