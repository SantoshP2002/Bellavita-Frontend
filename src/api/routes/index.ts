export const apiRoutes = {
  // Auth
  auth: {
    register: { method: "POST", url: "/auth/register" },
    login: { method: "POST", url: "/auth/login" },
  },

  // User
  user: {
    getUser: { method: "GET", url: "/users/user" },
  },

  // Products
  products: {
    createProduct: { method: "POST", url: "/products/create" },
    getAllProducts: { method: "GET", url: "/products" },
    getProductById: { method: "GET", url: "/products" },
    updateProductById: { method: "PATCH", url: "/products" },
    deleteProductById: { method: "DELETE", url: "/products" },
  },

  // Cart
  cart: {
    addToCart: { method: "POST", url: "/cart-product/add" },
    getUserCart: { method: "GET", url: "/cart" },
    updateCartProductQuantity: { method: "PATCH", url: "/cart-product/update" },
    deleteCartProduct: { method: "DELETE", url: "/cart-product/remove" },
  },

  // Address
  address: {
    addAddress: { method: "POST", url: "/address/add" },
    getAddress: { method: "GET", url: "/address" },
    updateAddress: { method: "PATCH", url: "/address/update" },
    deleteAddress: { method: "DELETE", url: "/address/delete" },
  },

  // Order
  order: {
    createOrder: { method: "POST", url: "/order/create" },
    getOrder: { method: "GET", url: "/order/" },
    getOrderById: { method: "GET", url: "/order" },
    getAdminOrder: { method: "GET", url: "/order/admin-order" },
  },

  // Review
  reviews: {
    createReview: { method: "POST", url: "/review" },
    getReviewsByProductId: { method: "GET", url: "/review" },
  },

  // Media
  media: {
    uploadSingleImage: { method: "POST", url: "/media/image/upload" },
  },

  // Blog
  blog: {
    createBlog: { method: "POST", url: "/blog/create" },
    getBlog: { method: "GET", url: "/blog" },
    getBlogById: { method: "GET", url: "/blog" },
    updateBlog: { method: "PATCH", url: "/blog" },
    deleteBlog: { method: "DELETE", url: "/blog" },
  },
};
