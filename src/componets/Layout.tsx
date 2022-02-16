import React from "react";
import Navbar from './Navbar';

const Layout: React.FC = ({ children = null }) => {
  return (
    <div>
      <Navbar />
      <React.Suspense fallback="loading page ...">
        {children}
      </React.Suspense>
    </div>
  )
}

export default Layout;