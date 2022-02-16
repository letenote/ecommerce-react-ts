import React from "react";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { TestId } from "../constant/TestId";
import { Link } from "react-router-dom";
import LinkNavigation from "./LinkNavigation";

interface navigationsProps {
  name: string;
  href: string;
}
interface NavbarMobileProps {
  show: boolean,
  setClose: () => void,
  navigations: Array<navigationsProps>
}
const NavbarMobile: React.FC<NavbarMobileProps> = ({ show, setClose, navigations }) => {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        data-testid={TestId.button.modal.main_menu_mobile.close_dialog}
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setClose}
      >
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
            <div data-testid={TestId.components.main_menu_mobile.id} style={{ display: "none" }}>{TestId.components.main_menu_mobile.value}</div>
            <div className="px-4 pt-5 pb-2 flex">
              <button
                data-testid={TestId.button.modal.main_menu_mobile.close_button}
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={setClose}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              {navigations.map((page) => (
                <LinkNavigation
                  key={page.name}
                  name={page.name}
                  href={page.href}
                />
              ))}
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root">
                <Link to="/login" data-testid={TestId.button.nav.login} className="-m-2 p-2 block font-medium text-gray-900">
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
  )
}

export default NavbarMobile;