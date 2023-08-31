import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOCALSTORAGECONSTANT } from "../constant/constant";

const userRole = localStorage.getItem(LOCALSTORAGECONSTANT.ROLE);

export const AddminAuthMiddleware = () => {
  const [parent, setParent] = useState(userRole === "addmin" ? true : null);

  return parent ? <Outlet /> : <Navigate to="/login" />;
};
