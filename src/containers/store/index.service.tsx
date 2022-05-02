import axios from "axios";
import { api } from "../../constant/response/api";
import { products } from "../../constant/response/products";
import { _rejectAddProductsToStoresDispatchType, _resolveAddProductsToStoresDispatchType } from "../../redux/actions/product-action/dispatch-types";

export const fetchProducts = async (
  _resolveAddProductsToStores: _resolveAddProductsToStoresDispatchType,
  _rejectAddProductsToStores: _rejectAddProductsToStoresDispatchType
): Promise<void> => {
  return axios.get(api.favorite)
    .then((res) => _resolveAddProductsToStores(products))
    .catch((err) => (
      _rejectAddProductsToStores({ status: err.response.status, code: err.code, message: err.message }),
      err
    ))
}