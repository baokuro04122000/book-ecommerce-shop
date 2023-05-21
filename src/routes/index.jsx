import React from 'react'
import { Route, Routes as ReactRoutes } from "react-router-dom";
import UnauthRoute from './UnauthRoute'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import PermissionRoute from './PermissionRoute'
import Products from '../pages/Products/Products';
import Sellers from '../pages/Sellers'
import AuthRoute from './AuthRoute';
import Checkout from '../pages/Checkout';
import Order from '../pages/Order';
import Packed from '../pages/Order/Packed';
import Ordered from '../pages/Order/Ordered';
import Cancelled from '../pages/Order/Cancelled';
const unauthRoutes = {
  path: '/',
  element: <Layout/>,
  guard: <UnauthRoute />,
  children :[
    {
      path: '/',
      element: <Home />
    },
    {
      path:'/sellers',
      element: <Sellers/>
    }

  ]
};

const checkoutRoutes = {
  path: '/checkout',
  element: <Layout/>,
  guard: <AuthRoute />,
  children :[
    {
      path: 'process',
      element: <Checkout />
    },
    {
      path: 'orders',
      element: <Order />
    },
    {
      path: 'packed',
      element: <Packed />
    },
    {
      path: 'ordered',
      element: <Ordered />
    },
    {
      path: 'cancelled',
      element: <Cancelled />
    },
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

const routes = [unauthRoutes,unauthRoutesProducs, checkoutRoutes, notfoundRoute];


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