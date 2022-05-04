import React, { useEffect } from 'react';
import { useState } from 'react'
import { Popover } from '@headlessui/react'
import { MenuIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import { TestId } from '../constant/TestId';
import { Link } from 'react-router-dom'
import Carts from '../componets/Carts';
import NavbarMobile from './NavbarMobile';
import LinkNavigation from './LinkNavigation';
import { Navigations } from '../models/Navigations';
import BannerInNavbar from './banners/BannerInNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import * as configActionCreators from '../redux/actions/config-action';
import * as userActionCreators from '../redux/actions/user-action';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { api } from '../constant/response/api';
import { configDataResponse } from '../constant/response/configDataResponse';

const Navbar: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { config, cart, user } = useSelector((state: RootState) => state);
  const { _setBannerInNavbarDismissAction, _resolveGetConfigAction, _rejectGetConfigAction } = bindActionCreators(
    configActionCreators,
    dispatch
  );
  const { _resolveUserLogin, _userLogout } = bindActionCreators(
    userActionCreators,
    dispatch
  );
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);
  const [openCarts, setOpenCarts] = useState<boolean>(false);

  useEffect(() => {
    const getConfigData = async () => {
      await axios.get(api.config)
        .then((res) => _resolveGetConfigAction(
          process.env.NODE_ENV === "test"
            ? res.data
            : configDataResponse.navbar
        ))
        .catch((err) => _rejectGetConfigAction({ status: err.response?.status, code: err.code, message: err.message }))
    };
    !config.loaded && getConfigData();
    localStorage.getItem("isAuthentication") && _resolveUserLogin()
  }, [])

  return (
    <div className="bg-white" style={{ top: 0, "position": "sticky", zIndex: 1 }}>
      {/* Start Mobile menu */}
      <div data-testid={TestId.components.navbar.id} style={{ display: "none" }}>{TestId.components.navbar.value}</div>
      <NavbarMobile
        show={openMenuMobile}
        navigations={Navigations}
        setClose={() => setOpenMenuMobile(false)}
      />
      {/* End Mobile menu */}

      <header className="relative bg-white">
        <BannerInNavbar
          show={config.banners?.navbar?.show}
          message={config.banners?.navbar?.message}
          type={config.banners?.navbar?.type}
          href={config.banners?.navbar?.href}
          setDismiss={() => _setBannerInNavbarDismissAction()}
        />

        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                data-testid={TestId.button.modal.main_menu_mobile.open}
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpenMenuMobile(true)}
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
                  {Navigations.map((page) => (
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
                  {
                    user.isAuthentication
                      ? <span onClick={() => _userLogout()} style={{ cursor: "pointer" }} data-testid={TestId.button.nav.logout} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign out
                      </span>
                      : <Link to="/login" data-testid={TestId.button.nav.login} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                      </Link>
                  }
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  {/* <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </Link> */}
                </div>

                {/* Avatar */}
                {
                  user.isAuthentication && (
                    <div data-testid={TestId.button.nav.avatar} className="flex lg:ml-6">
                      <img
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                        src={user.avatar}
                        alt=""
                      />
                    </div>
                  )
                }

                {/* Carts */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button data-testid={TestId.button.modal.carts.open} onClick={() => setOpenCarts(true)} className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className={"ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"}>{cart.items.length}</span>
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
