import React from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";
import { NavigationInterface } from "../constant/Navigations";

const LinkNavigation: React.FC<NavigationInterface> = ({ name, href }) => {
  const { pathname } = useLocation();
  let getParentRoute = `/${pathname.split("/")[1]}`;
  let custMatch = getParentRoute === href;
  let resolved = useResolvedPath(href);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      data-testid={`nav-${name.toLowerCase()}`}
      to={href}
      className={`flex items-center text-sm ${custMatch ? "font-black" : "font-medium"} text-gray-700 hover:text-gray-800`}
    >
      {name}
    </Link>
  )
}

export default LinkNavigation;