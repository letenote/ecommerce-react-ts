import React from "react";
import Navbar from './Navbar';

const Layout: React.FC = ({ children = null }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout;