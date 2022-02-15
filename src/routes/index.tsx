import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "../containers/home";
import Login from "../containers/login";
import DashboardCheckout from "../containers/dashboard/checkout";
import Navbar from '../componets/Navbar';
import Store from '../containers/store';
import Product from '../containers/product';
import Fallback404 from '../componets/fallback/Fallback404';

const AppRoutes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<DashboardCheckout />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<Fallback404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRoutes;