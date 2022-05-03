import axios from "axios";
import { api } from "../../constant/response/api";
import { products } from "../../constant/response/products";
import { _productActionDispatchTypes, _rejectAddProductsToStoresDispatchType, _resolveAddProductsToStoresDispatchType } from "../../redux/actions/product-action/dispatch-types";

/**
 * (helper) fetchProducts
 * @param _resolveAddProductsToStores: _resolveAddProductsToStoresDispatchType
 * @param _rejectAddProductsToStores: _rejectAddProductsToStoresDispatchType
 * @returns Promise<_productActionDispatchTypes>
 */
export const fetchProducts = async (
  _resolveAddProductsToStores: _resolveAddProductsToStoresDispatchType,
  _rejectAddProductsToStores: _rejectAddProductsToStoresDispatchType
): Promise<_productActionDispatchTypes> => {
  return axios.get(api.favorite)
    .then((res) => _resolveAddProductsToStores(
      process.env.NODE_ENV === "test"
        ? res.data
        : products
    ))
    .catch((err) => _rejectAddProductsToStores({
      status: err.response?.status,
      code: err.code,
      message: err.message
    }))
}