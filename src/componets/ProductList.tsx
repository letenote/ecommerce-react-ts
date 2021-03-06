import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { TestId } from '../constant/TestId';
import { idrFormater } from '../helper/IdrFormater';
import { FetchStatus } from '../models/FetchStatus';
import { Product } from '../models/Product';
import FallbackLoading from './fallback/FallbackLoading';

interface ProductListProps {
  products: Array<Product>,
  title: string,
  loading: boolean,
  fetchStatus: FetchStatus
}
const ProductList: React.FC<ProductListProps> = ({ products = [], loading, title, fetchStatus }) => {
  if (loading) return <FallbackLoading message='Loading..' minHeight={"600px"} />
  if (fetchStatus.status < 200 || fetchStatus.status >= 300 || fetchStatus.status >= 400 || fetchStatus.status >= 500) {
    return <FallbackLoading message={"Terjadi Masalah"} minHeight={"600px"} />
  }
  return (
    <div className="bg-white">
      <div data-testid={TestId.components.productList.id} style={{ display: "none" }}>{TestId.components.productList.value}</div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{title}</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length > 0 && products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.images?.item}
                  alt={product.images?.alt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/stores/${slugify(product?.name ?? "", { replacement: "-", lower: true, trim: true })}?id=${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product?.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product?.inventory?.sku[0].color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{idrFormater(product?.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList
