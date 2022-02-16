import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes
} from "react-router-dom";
import Layout from '../componets/Layout';
import Home from "../containers/home";
import Login from "../containers/login";
import DashboardCheckout from "../containers/dashboard/checkout";
import Store from '../containers/store';
import Product from '../containers/product';
import Fallback404 from '../componets/fallback/Fallback404';

const AppRoutes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Nested />} />
      </Routes>
    </BrowserRouter>
  )
}

const Nested: React.FC<{}> = () => {
  return useRoutes([
    {
      path: "",
      children: [
        { path: "", element: <Layout><Home /></Layout> },
        {
          path: "stores",
          children: [
            { path: "", element: <Layout><Store /></Layout> },
            { path: ":id", element: <Layout><Product /></Layout> }
          ]
        },
        { path: "checkout", element: <Layout><DashboardCheckout /></Layout> },
        { path: "*", element: <Layout><Fallback404 /></Layout> }
      ]
    }
  ]);
}

export default AppRoutes;