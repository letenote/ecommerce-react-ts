import axios from "axios";
import { api } from "../../constant/response/api";
import { products } from "../../constant/response/products";
import { _rejectAddProductToDetailDispatchType, _resolveAddProductToDetailDispatchType } from "../../redux/actions/product-action/dispatch-types";

/**
 * (helper) fetchProductDetail
 * @param getId: number,
 * @param _resolveAddProductToDetail:_resolveAddProductToDetailDispatchType 
 * @param _rejectAddProductToDetail: _rejectAddProductToDetailDispatchType
 * @returns Promise<void>
 */
export const fetchProductDetail = async (
  getId: string,
  _resolveAddProductToDetail: _resolveAddProductToDetailDispatchType,
  _rejectAddProductToDetail: _rejectAddProductToDetailDispatchType
): Promise<void> => {
  const getProduct = products.filter((product) => product.id === getId);
  console.log("getproduct", getProduct)
  return axios.get(api.product)
    .then((res) => _resolveAddProductToDetail(getProduct[0] ?? null))
    .catch((err) => err)
  // .catch((err) => (
  //   _rejectAddFavoriteToProduct({ status: err.response.status, code: err.code, message: err.message }),
  //   err
  // ))
}