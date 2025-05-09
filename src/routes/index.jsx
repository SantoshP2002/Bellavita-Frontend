import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import NotFound from "../pages/error/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "test",
        element: <div>Test</div>,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
