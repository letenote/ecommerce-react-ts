import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import Breadcrumbs from '../../componets/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { TestId } from '../../constant/TestId';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { _resetProducts } from '../../redux/actions/product-action';
import * as productActionCreators from '../../redux/actions/product-action';
import { bindActionCreators } from 'redux';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { products } from "../../constant/response/products";
import { fetchProductDetail } from './index.service';
import FallbackLoading from '../../componets/fallback/FallbackLoading';
import { idrFormater } from '../../helper/IdrFormater';
const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

const Product: React.FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const getParamsId = searchParams.get("id");
  const dispatch = useDispatch();
  const { config, products } = useSelector((state: RootState) => state);
  const { _resetProducts, _resolveAddProductToDetail, _rejectAddProductToDetail } = bindActionCreators(
    productActionCreators,
    dispatch
  );

  useEffect(() => {
    const homeDidMount = async () => {
      await fetchProductDetail(
        getParamsId ?? "xAerCF123123",
        _resolveAddProductToDetail,
        _rejectAddProductToDetail
      );
    }

    homeDidMount();
  }, []);

  useEffect(() => {
    return () => {
      _resetProducts()
    }
  }, [])


  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])


  if (products.detail.loading) return <FallbackLoading message='Loading..' minHeight={"600px"} />
  if (!products.detail.loading && products.detail.data === null) return <FallbackLoading message='Product Tidak Ditemukan' minHeight={"600px"} />
  return (
    <div className="bg-white">
      <div className="pt-6">
        <div data-testid={TestId.containers.product.id} style={{ display: "none" }}>{TestId.containers.product.value}</div>
        <Breadcrumbs />

        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={products.detail.data?.images.detail[0]}
              alt={products.detail.data?.images.alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={products.detail.data?.images.detail[1]}
                alt={products.detail.data?.images.alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={products.detail.data?.images.detail[2]}
                alt={products.detail.data?.images.alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={products.detail.data?.images.detail[3]}
              alt={products.detail.data?.images.alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{products.detail.data?.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{idrFormater(products.detail.data?.price ?? 0)}</p>

            {/* Reviews */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> */}

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {products.detail.data?.inventory.sku.map((item) => (
                      <RadioGroup.Option
                        key={item.color}
                        value={item.color}
                        className={({ active, checked }) =>
                          classNames(
                            "ring-gray-400", // <= harcode
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="p" className="sr-only">
                          {item.color}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: item.hexColor }}
                          className={classNames(
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {products.detail.data?.inventory.sku.map((item) => (
                      <RadioGroup.Option
                        key={item.size}
                        value={item.size}
                        disabled={item.quantity > 0 ? false : true}
                        className={({ active }) =>
                          classNames(
                            item.quantity > 0
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="p">{item.size}</RadioGroup.Label>
                            {item.quantity > 0 ? (
                              <div
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'absolute -inset-px rounded-md pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <div
                                aria-hidden="true"
                                className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                              >
                                <svg
                                  className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </div>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{products.detail.data?.description.preview}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                  {products.detail.data?.description.highlight.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{products.detail.data?.description.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
