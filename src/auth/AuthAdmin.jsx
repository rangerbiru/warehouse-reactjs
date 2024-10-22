import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useState } from "react";

const AuthAdmin = () => {
  const { user, role } = useAuth();
  const location = useLocation();

  const [keyUser, setKeyUser] = useState(
    localStorage.getItem("sb-pxgyeyeyqjeewvltjcww-auth-token")
  );

  return keyUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthAdmin;
