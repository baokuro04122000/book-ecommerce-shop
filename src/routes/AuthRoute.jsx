
import { Navigate, Outlet } from "react-router-dom";

import { selectIsAuth } from "../store/authentication/selector";


const AuthRoute = () => {
  const isAuth = selectIsAuth();
  if(!isAuth)
    return <Navigate to={'/'}/>
  return  <Outlet />
  
};

export default AuthRoute;
