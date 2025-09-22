import { createBrowserRouter } from "react-router-dom";

import Main from "../pages/main";
import Home from "../pages/home";
import RegisterRedirect from "./RegisterRedirect";
import LoginRedirect from "./LoginRedirect";
import PrivateRoute from "./PrivateRoute";

// ADMIN PAGES
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/children/Dashboard";
import Users from "../pages/admin/children/Users";
import Products from "../pages/admin/children/Products";
import Orders from "../pages/admin/children/Orders";
import UploadProducts from "../pages/admin/children/UploadProducts";
import UpdateProduct from "../pages/admin/children/UpdateProduct";
import Cart from "../pages/cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  // ADMIN ROUTES
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "products/upload", element: <UploadProducts /> },
      { path: "products/update/:id", element: <UpdateProduct /> },
      { path: "orders", element: <Orders /> },
    ],
  },
  // AUTH ROUTES
  { path: "login", element: <LoginRedirect /> },
  { path: "register", element: <RegisterRedirect /> },

  // CART PAGE
]);

export default router;
