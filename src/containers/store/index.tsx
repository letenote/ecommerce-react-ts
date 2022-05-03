import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from '../../componets/ProductList';
import { TestId } from "../../constant/TestId";
import { RootState } from "../../redux/store";
import * as productActionCreators from '../../redux/actions/product-action';
import { fetchProducts } from "./index.service";
import { bindActionCreators } from "redux";

const Store: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state);
  const { _resetProducts, _resolveAddProductsToStores, _rejectAddProductsToStores } = bindActionCreators(
    productActionCreators,
    dispatch
  );

  useEffect(() => {
    const homeDidMount = async () => {
      await fetchProducts(_resolveAddProductsToStores, _rejectAddProductsToStores);
    }

    homeDidMount();
  }, []);

  useEffect(() => {
    return () => {
      _resetProducts()
    }
  }, [])

  return (
    <div>
      <div data-testid={TestId.containers.stores.id} style={{ display: "none" }}>{TestId.containers.stores.value}</div>
      <ProductList
        title={"Store"}
        loading={products.stores.loading}
        products={products.stores.list}
        fetchStatus={products.stores.fetch}
      />
    </div>
  )
}

export default Store;