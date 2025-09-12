export const apiRoutes = {
  auth: {
    register: { method: "POST", url: "/auth/register" },
    login: { method: "POST", url: "/auth/login" },
  },
  user: {
    getUser: { method: "GET", url: "/users/user" },
  },
  products: {
    createProduct: { method: "POST", url: "/products/create-product" },
    getAllProducts: { method: "GET", url: "/products/all-products" },
  },
};
