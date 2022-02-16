import React, { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import makeTitleFromSlug from "../helper/makeTitleFromSlug";

interface BreadcrumsInterface {
  id: string;
  name: string;
  href: string
};

const Breadcrumbs: React.FC<{}> = () => {
  const [getBreadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumsInterface>>([]);
  const location = useLocation();
  const pathnameSplit = location.pathname.split("/");

  useEffect(() => {
    const joinBreadcrumbs = async (paths: Array<string>): Promise<Array<BreadcrumsInterface>> => {
      return paths.map((path, pathIndex) => {
        return {
          id: `${pathIndex}`,
          name: path === "" ? "Home" : makeTitleFromSlug(path),
          href: `/${path}`
        }
      })
    };

    joinBreadcrumbs(pathnameSplit).then((res) => setBreadcrumbs(res))
  }, []);

  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
        {
          getBreadcrumbs.length > 0 && getBreadcrumbs.map((breadcrumb, breadcrumbIndex) => (
            <li key={breadcrumb.id}>
              <div className="flex items-center">
                {
                  getBreadcrumbs.length - 1 !== breadcrumbIndex
                    ? <Link to={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </Link>
                    : <span aria-current="page" className="text-sm font-medium text-gray-500 hover:text-gray-600">
                      {breadcrumb.name}
                    </span>
                }
                {
                  getBreadcrumbs.length - 1 !== breadcrumbIndex
                    ? <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-4 h-5 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                    : null
                }
              </div>
            </li>
          ))
        }
      </ol>
    </nav>
  )
}

export default memo(Breadcrumbs);