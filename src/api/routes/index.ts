export const apiRoutes = {
  auth: {
    register: { method: "POST", url: "/auth/register" },
    login: { method: "POST", url: "/auth/login" },
  },
  user: {
    getUser: { method: "GET", url: "/users/user" },
  },
  products: {
    createProduct: { method: "POST", url: "/products/create" },
    getAllProducts: { method: "GET", url: "/products" },
    getProductById: { method: "GET", url: "/products" },
    updateProductById: { method: "PATCH", url: "/products" },
    deleteProductById: { method: "DELETE", url: "/products" },
  },
  cart: {
    addToCart: { method: "POST", url: "/carts/add-to-cart" },
  },
};
