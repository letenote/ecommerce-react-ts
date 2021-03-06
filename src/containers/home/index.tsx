import React, { useEffect } from "react";
import PromoSection from '../../componets/PromoSection'
import ProductList from '../../componets/ProductList'
import { TestId } from "../../constant/TestId";
import * as productActionCreators from '../../redux/actions/product-action';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../redux/store";
import { fetchFavoritePodutcs } from "./index.service";

const Home: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { config, products } = useSelector((state: RootState) => state);
  const { _resetProducts, _resolveAddFavoriteToProduct, _rejectAddFavoriteToProduct } = bindActionCreators(
    productActionCreators,
    dispatch
  );

  useEffect(() => {
    const homeDidMount = async () => {
      await fetchFavoritePodutcs(_resolveAddFavoriteToProduct, _rejectAddFavoriteToProduct);
      // await axios.get(api.favorite)
      // .then((res) => _resolveAddFavoriteToProduct(
      //   process.env.NODE_ENV === "test"
      //     ? res.data
      //     : products
      // ))
      // .catch((err) => _rejectAddFavoriteToProduct({ status: err.response?.status, code: err.code, message: err.message }))
    };
    homeDidMount();
  }, []);

  useEffect(() => {
    return () => {
      _resetProducts()
    }
  }, [])

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
        loading={products.favorite.loading}
        products={products.favorite.list}
        fetchStatus={products.favorite.fetch}
      />
    </div>
  )
}

export default Home;
