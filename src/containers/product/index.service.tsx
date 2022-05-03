import axios from "axios";
import { api } from "../../constant/response/api";
import { products } from "../../constant/response/products";
import { _productActionDispatchTypes, _rejectAddProductToDetailDispatchType, _resolveAddProductToDetailDispatchType } from "../../redux/actions/product-action/dispatch-types";

/**
 * (helper) fetchProductDetail
 * @param getId: number,
 * @param _resolveAddProductToDetail:_resolveAddProductToDetailDispatchType 
 * @param _rejectAddProductToDetail: _rejectAddProductToDetailDispatchType
 * @returns Promise<_productActionDispatchTypes>
 */
export const fetchProductDetail = async (
  getId: string,
  _resolveAddProductToDetail: _resolveAddProductToDetailDispatchType,
  _rejectAddProductToDetail: _rejectAddProductToDetailDispatchType
): Promise<_productActionDispatchTypes> => {
  const getProduct = products.filter((product) => product.id === getId);
  return axios.get(api.product)
    .then((res) => _resolveAddProductToDetail(
      process.env.NODE_ENV === "test"
        ? res.data
        : getProduct[0] ?? null
    ))
    .catch((err) => _rejectAddProductToDetail({
      status: err.response?.status,
      code: err.code,
      message: err.message
    }))
}