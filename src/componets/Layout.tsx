import React from "react";
import Navbar from './Navbar';

const Layout: React.FC = (props) => {
  return (
    <div>
      <Navbar />
      {props.children || null}
    </div>
  )
}

export default Layout;