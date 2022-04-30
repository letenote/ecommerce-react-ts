import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { bindActionCreators } from "redux";
import Layout from '../componets/Layout';
import { idle } from "../helper/idle";
import { RootState } from "../redux/store";
import * as configActionCreators from '../redux/actions/config-action';
import { fetchConfigData } from "./routes.service";

const LazyHome = React.lazy(() => import('../containers/home'));
const LazyStore = React.lazy(() => import('../containers/store'));
const LazyLogin = React.lazy(() => import('../containers/login'));
const LazyProduct = React.lazy(() => import('../containers/product'));
const LazyCheckout = React.lazy(() => import('../containers/dashboard/checkout'));
const LazyFallback404 = React.lazy(() => import('../componets/fallback/Fallback404'));

const AppRoutes: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { config } = useSelector((state: RootState) => state);
  const { _setDelayAction, _setBannersAction } = bindActionCreators(
    configActionCreators,
    dispatch
  );
  useEffect(() => {
    const homeDidMount = async () => {
      // await idle(850)
      !config.loaded && await fetchConfigData(_setDelayAction, _setBannersAction);
    }

    homeDidMount();
  }, []);
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
            { path: ":id", element: <LazyProduct /> }
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