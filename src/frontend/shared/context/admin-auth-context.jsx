import { createContext } from "react";

export const AdminAuthContext = createContext({
  isAdminLoggedIn: false,
  adminToken: null,
  adminId: null,
  adminLogin: () => {},
  adminLogout: () => {},
});
