import React, { useEffect, useState } from "react";
import PromoSection from '../../componets/PromoSection'
import ProductList from '../../componets/ProductList'
import { TestId } from "../../constant/TestId";
import * as configActionCreators from '../../redux/actions/config-action';
import * as productActionCreators from '../../redux/actions/product-action';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { idle } from "../../helper/idle";
import { RootState } from "../../redux/store";
import { fetchConfigData, fetchFavoritePodutcs } from "./home.service";

const Home: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { config, products } = useSelector((state: RootState) => state);
  const { _setDelayAction, _setBannersAction } = bindActionCreators(
    configActionCreators,
    dispatch
  );
  const { _resolveAddFavoriteToProduct, _rejectAddFavoriteToProduct } = bindActionCreators(
    productActionCreators,
    dispatch
  );

  useEffect(() => {
    const homeDidMount = async () => {
      await idle(1000)
      !config.loaded && await fetchConfigData(_setDelayAction, _setBannersAction);
      await idle(1000)
      await fetchFavoritePodutcs(_resolveAddFavoriteToProduct, _rejectAddFavoriteToProduct);
      console.log("*")
    }

    homeDidMount();
  }, []);

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
