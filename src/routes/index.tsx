import React from "react";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import Layout from '../componets/Layout';

const LazyHome = React.lazy(() => import('../containers/home'));
const LazyStore = React.lazy(() => import('../containers/store'));
const LazyLogin = React.lazy(() => import('../containers/login'));
const LazyProduct = React.lazy(() => import('../containers/product'));
const LazyCheckout = React.lazy(() => import('../containers/dashboard/checkout'));
const LazyFallback404 = React.lazy(() => import('../componets/fallback/Fallback404'));

const AppRoutes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback="loading routes...">
        <Routes>
          <Route
            path="/*"
            element={
              <React.Suspense fallback="loading layout ...">
                <Layout>
                  <Nested />
                </Layout>
              </React.Suspense>
            }
          />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

const Nested: React.FC<{}> = () => {
  return useRoutes([
    {
      path: "",
      children: [
        { path: "", element: <LazyHome /> },
        {
          path: "stores",
          children: [
            { path: "", element: <LazyStore /> },
            { path: ":name", element: <LazyProduct /> }
          ]
        },
        { path: "checkout", element: <LazyCheckout /> },
        { path: "login", element: <LazyLogin /> },
        { path: "*", element: <LazyFallback404 /> }
      ]
    }
  ]);
}

export default AppRoutes;