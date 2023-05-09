
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../store";
import { selectIsAuth } from "../store/authentication/selector";


const UnauthRoute = () => {
  const isAuth = useAppSelector(selectIsAuth);
 
  return  <Outlet />
  
};

export default UnauthRoute;
