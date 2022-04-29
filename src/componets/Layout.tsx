import React from "react";
import Navbar from './Navbar';

const Layout: React.FC = ({ children = null }) => {
  return (
    <div>
      <Navbar />
      <React.Suspense fallback={<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">loading page ...</div>}>
        {children}
      </React.Suspense>
    </div>
  )
}

export default Layout;