import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "../containers/home";
import Login from "../containers/login";
import Signup from "../containers/signup";
import DashboardCheckout from "../containers/dashboard/checkout";
import Navbar from '../components/Navbar';

const AppRoutes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<DashboardCheckout />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRoutes;