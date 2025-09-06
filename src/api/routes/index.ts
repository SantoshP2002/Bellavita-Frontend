export const apiRoutes = {
  auth: {
    register: { method: "POST", url: "/auth/register" },
    login: { method: "POST", url: "/auth/login" },
  },
  user: {
    getUser: { method: "GET", url: "/users/user" },
  },
};
