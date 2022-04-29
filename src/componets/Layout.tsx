import React from "react";
import FallbackLoading from "./fallback/FallbackLoading";
import Navbar from './Navbar';

const Layout: React.FC = ({ children = null }) => {
  return (
    <div>
      <Navbar />
      <React.Suspense fallback={<FallbackLoading message={"loading page ..."} />}>
        {children}
      </React.Suspense>
    </div>
  )
}

export default Layout;