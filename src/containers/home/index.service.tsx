import axios from "axios";
import { api } from "../../constant/response/api";
import { products } from "../../constant/response/products";
import { _productActionDispatchTypes, _rejectAddFavoriteToProductDispatchType, _resolveAddFavoriteToProductDispatchType } from "../../redux/actions/product-action/dispatch-types";

/**
 * (helper) fetchFavoritePodutcs
 * @param _setFavoriteProdutcs: _resolveAddFavoriteToProductDispatchType 
 * @param _rejectAddFavoriteToProduct: _rejectAddFavoriteToProductDispatchType
 * @returns Promise<_productActionDispatchTypes>
 */
export const fetchFavoritePodutcs = async (
  _setFavoriteProdutcs: _resolveAddFavoriteToProductDispatchType,
  _rejectAddFavoriteToProduct: _rejectAddFavoriteToProductDispatchType
): Promise<_productActionDispatchTypes> => {
  return axios.get(api.favorite)
    .then((res) => _setFavoriteProdutcs(
      process.env.NODE_ENV === "test"
        ? res.data
        : products
    ))
    .catch((err) => _rejectAddFavoriteToProduct({
      status: err.response?.status,
      code: err.code,
      message: err.message
    }))
}