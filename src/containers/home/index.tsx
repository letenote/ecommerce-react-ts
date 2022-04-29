import React, { useEffect } from "react";
import PromoSection from '../../componets/PromoSection'
import ProductList from '../../componets/ProductList'
import { TestId } from "../../constant/TestId";
import * as configActionCreators from '../../redux/actions/config-action';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { idle } from "../../helper/idle";
import { RootState } from "../../redux/store";
import axios from "axios"
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

const Home: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { config } = useSelector((state: RootState) => state);
  const { setDelayAction, setBannersAction } = bindActionCreators(
    configActionCreators,
    dispatch
  );
  useEffect(() => {
    // const fetchConfigData = async () => {
    const data = {
      delay: 2000,
      navbar: {
        show: true,
        // message: "Get free delivery on orders over $100",
        message: "Big news! We're excited to announce a brand new product.",
        href: "/stores",
        type: "2",
        dismiss: false
      }
    }
    //   await idle(2000);
    //   return data;
    // }
    const fetchConfigData = async () => {
      axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) => (setDelayAction(data.delay), res))
        .then((res) => setBannersAction(data.navbar))
        .catch((err) => err)
    }

    !config.loaded && fetchConfigData()
    // .then((res) => (setDelayAction(res.delay), res))
    // .then((res) => setBannersAction(res.navbar))
    // .catch(err => console.error(err));

  }, []);

  // const getConfigList = () => {
  //   axios.get("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res)
  //     .catch((err) => err)
  // }

  return (
    <div>
      <div data-testid={TestId.containers.home.id} style={{ display: "none" }}>{TestId.containers.home.value}</div>
      <PromoSection />
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <ProductList
        title={"Customers also purchased"}
        loading={true}
        products={products}
      />
    </div>
  )
}

export default Home;
