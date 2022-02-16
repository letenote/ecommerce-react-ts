/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import { Disclosure, Menu } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import { Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom'
import Carts from '../componets/Carts';

const navigation = {
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Stores', href: '/stores' },
  ],
};

interface LinkNavigationProps {
  name: string;
  href: string
}

const LinkNavigation: React.FC<LinkNavigationProps> = ({ name, href }) => {
  const { pathname } = useLocation();
  let getParentRoute = `/${pathname.split("/")[1]}`;
  let custMatch = getParentRoute === href;
  let resolved = useResolvedPath(href);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      to={href}
      className={`flex items-center text-sm ${custMatch ? "font-black" : "font-medium"} text-gray-700 hover:text-gray-800`}
    >
      {name}
    </Link>
  )
}

const Navbar: React.FC<{}> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openCarts, setOpenCarts] = useState<boolean>(false);

  return (
    <div className="bg-white">
      {/* Start Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link to={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <Link to="/login" className="-m-2 p-2 block font-medium text-gray-900">
                    Sign in
                  </Link>
                </div>
                {/* <div className="flow-root">
                  <Link to="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Create account
                  </Link>
                </div> */}
              </div>

            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      {/* End Mobile menu */}

      <header className="relative bg-white">
        <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
                style={{ width: 40 }}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout desktop menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.pages.map((page) => (
                    <LinkNavigation
                      key={page.name}
                      name={page.name}
                      href={page.href}
                    />
                  ))}
                </div>
              </Popover.Group>

              {/* Signin | signup */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  {/* <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </Link> */}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    alt=""
                  />
                  {/* <Link to="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </Link> */}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button onClick={() => setOpenCarts(true)} className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
                <Carts
                  show={openCarts}
                  onClose={() => setOpenCarts(false)}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar;
