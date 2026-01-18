import { createBrowserRouter, Outlet } from "react-router-dom";

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
import ProductDetails from "../pages/product/ProductDetails";
import AllProducts from "../pages/product/AllProducts";
import Address from "../pages/address/Address";
import AllOrder from "../pages/order";
import OrderDetails from "../pages/order/OrderDetails";
import CheckoutSummary from "../pages/address/CheckoutSummary";
import Blog from "../pages/footer/information/Blog";
import NewsRoom from "../pages/footer/information/NewsRoom";
import TermsAndCondition from "../pages/footer/information/TermsAndCondition";
import PrivacyPolicy from "../pages/footer/information/PrivacyPolicy";
import RefundAndReturn from "../pages/footer/information/RefundAndReturn";
import ShippingPolicy from "../pages/footer/information/ShippingPolicy";
import BulkOrder from "../pages/footer/information/BulkOrder";
import BlogUpload from "../pages/admin/children/BlogUpload";
import AllBlogs from "../pages/admin/children/AllBlogs";
import EditBlog from "../pages/admin/children/EditBlog";
import BlogDetails from "../pages/footer/information/BlogDetails";
import AboutUs from "../pages/footer/support/AboutUs";
import ContactUs from "../pages/footer/support/ContactUs";
import OrderTracking from "../pages/footer/support/OrderTracking";
import FAQ from "../pages/footer/support/FAQ";
import Sitemap from "../pages/footer/support/Sitemap";
import GoogleAuth from "../pages/auth/GoogleAuth";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import ChangePassword from "../pages/profile/ChangePassword";
import CrazyDealsMobile from "../components/CrazyDealsMobile";
import SearchPage from "../pages/search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "blogs", element: <Blog /> },
      { path: "profile", element: <Profile /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "/blog/:id", element: <BlogDetails /> },
      { path: "newsroom", element: <NewsRoom /> },
      { path: "terms-and-condition", element: <TermsAndCondition /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "refund-return", element: <RefundAndReturn /> },
      { path: "shipping-policy", element: <ShippingPolicy /> },
      { path: "bulk-order", element: <BulkOrder /> },
      { path: "aboutUs", element: <AboutUs /> },
      { path: "contactUs", element: <ContactUs /> },
      { path: "order-tracking", element: <OrderTracking /> },
      { path: "faq", element: <FAQ /> },
      { path: "sitemap", element: <Sitemap /> },
      { path: "crazy-deals-mobile", element: <CrazyDealsMobile /> },
      { path: "search", element: <SearchPage /> },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "address",
        element: (
          <PrivateRoute>
            <Address />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckoutSummary />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <AllOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "products",
        element: <Outlet />,
        children: [
          { index: true, element: <AllProducts /> },
          { path: ":productId", element: <ProductDetails /> },
        ],
      },
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
      { path: "blog", element: <AllBlogs /> },
      { path: "blog/upload", element: <BlogUpload /> },
      { path: "blog/edit/:id", element: <EditBlog /> },
    ],
  },
  // AUTH ROUTES
  { path: "login", element: <LoginRedirect /> },
  { path: "google-auth", element: <GoogleAuth /> },
  { path: "register", element: <RegisterRedirect /> },
  { path: "change-password", element: <ChangePassword /> },

  // Address page
]);

export default router;
