import React from 'react'
import { Route, Routes as ReactRoutes } from "react-router-dom";
import UnauthRoute from './UnauthRoute'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import PermissionRoute from './PermissionRoute'
import ProductsPage from '../pages/Products';
import Products from '../pages/Products/Products';
import ProductDetail from '../pages/Products/ProductDetail';
const unauthRoutes = {
  path: '/',
  element: <Layout/>,
  guard: <UnauthRoute />,
  children :[
    {
      path:'login',
      element: <div>Login</div>
    },
    {
      path: 'sign-up',
      element:<>sign up</>
    },
    {
      path: '/',
      element: <Home />
    }

  ]
};

const unauthRoutesProducs = {
  path: '/products',
  element: <Layout page="products"/>,
  guard: <UnauthRoute />,
  children :[
    {
      path:':params',
      element: <Products/>
    },

  ]
};

const notfoundRoute = {
  path: "*",
  element: <>Page not found</>,
};

const routes = [unauthRoutes,unauthRoutesProducs, notfoundRoute];


const Routes = () => {
  return (
    <ReactRoutes>
      {routes.map((route) => (
        <Route key={route.path} element={route.guard}>
          <Route element={<PermissionRoute permissions={route.permissions} />}>
            <Route path={route.path} element={route.element}>
              {route.children
                ? route.children.map(({ element, path, permissions }) => (
                    <Route key={path} element={route.guard}>
                      <Route
                        element={<PermissionRoute permissions={permissions} />}
                      >
                        <Route path={path} element={element} />
                      </Route>
                    </Route>
                  ))
                : null}
            </Route>
          </Route>
        </Route>
      ))}
    </ReactRoutes>
  );
};

export default Routes;