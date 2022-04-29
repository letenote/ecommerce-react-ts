import React from "react";
import ProductList from '../../componets/ProductList';
import { TestId } from "../../constant/TestId";

const products = [
  {
    id: "1",
    name: 'Basic Tee Black',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: "2",
    name: 'Basic Tee Yellow',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: "3",
    name: 'Basic Tee Grey',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: "4",
    name: 'Basic Tee Orange',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

const Store: React.FC<{}> = () => {
  return (
    <div>
      <div data-testid={TestId.containers.stores.id} style={{ display: "none" }}>{TestId.containers.stores.value}</div>
      <ProductList
        title={"Store"}
        loading={false}
        products={products}
      />
    </div>
  )
}

export default Store;