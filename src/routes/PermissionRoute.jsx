
import { Outlet } from "react-router-dom";
import React from "react";

const PermissionRoute = ({permissions}) => {
  if (!permissions) return <Outlet />;
  return <Outlet/>
  //let isAllow = false;
  // for (const role of userPermissions) {
  //   if (role !== undefined && permissions.includes(role)) {
  //     isAllow = true;
  //     break;
  //   }
  // }

  // return isAllow ? <Outlet /> : <Navigate to="unauthorized" />;
};

export default PermissionRoute;
