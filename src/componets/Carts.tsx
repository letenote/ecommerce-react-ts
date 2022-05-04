/* This example requires Tailwind CSS v2.0+ */
/** https://flowbite.com/docs/getting-started/introduction/ */
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { TestId } from '../constant/TestId'
import { idrFormater } from '../helper/IdrFormater'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import * as cartActionCreators from '../redux/actions/cart-action';
import { bindActionCreators } from 'redux'
import { sumOfNumbers } from '../helper/sumOfNumbers'

interface CartsProps {
  show: boolean;
  onClose: () => void
}

const Carts: React.FC<CartsProps> = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state: RootState) => state);
  const { _removeProductFromCartAction } = bindActionCreators(
    cartActionCreators,
    dispatch
  );
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={onClose}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-0 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div data-testid={TestId.components.carts.id} style={{ display: "none" }}>{TestId.components.carts.value}</div>
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Keranjang Belanja</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          data-testid={TestId.button.modal.carts.close}
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {
                            cart.items.length > 0 && cart.items.map((product, productIndex) => (
                              <li key={`${productIndex}-${product.product_id}`} className="py-6 flex">
                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="w-full h-full object-center object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link
                                          onClick={onClose}
                                          to={product.href}
                                        >
                                          {product.product_name}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">{idrFormater(product.price)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => _removeProductFromCartAction(product.product_id, productIndex)}
                                      >
                                        Hapus
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {
                          cart.items.length > 0
                            ? idrFormater(
                              sumOfNumbers(
                                cart.items.map((item) => { return { price: item.price } })
                              )
                            )
                            // ? idrFormater(cart.items.reduce((val, product) => val + product.price, 0))
                            : 0
                        }
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Pengiriman dan pajak dihitung saat checkout.</p>
                    <div className="mt-6">
                      {
                        user.isAuthentication
                          ? <Link
                            to="/checkout"
                            onClick={onClose}
                            data-testid={TestId.button.nav.checkout}
                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Checkout
                          </Link>
                          : <Link
                            to="/login"
                            onClick={onClose}
                            data-testid={TestId.button.nav.checkout}
                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Sign in
                          </Link>
                      }
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        atau{' '}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={onClose}
                        >
                          Lanjutkan Belanja<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Carts
