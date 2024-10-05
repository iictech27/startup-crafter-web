import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  const loggedInUser = useSelector((store) => store.user.users);
  useEffect(() => {
    if (loggedInUser === null) {
      navigate("/user-login");
    }
  }, []);

  return <Outlet />;
};

export const ProtectedRouteForAdmin = () => {
  const navigate = useNavigate();

  const loggedInUser = useSelector((store) => store.admin.admin);
  useEffect(() => {
    if (loggedInUser === null) {
      navigate("/admin-login");
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
