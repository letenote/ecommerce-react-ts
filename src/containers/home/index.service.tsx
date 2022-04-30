import axios from "axios";
import { api } from "../../constant/response/api";
import { _setDelayAction, _setBannersAction } from '../../redux/actions/config-action';
import { products } from "../../constant/response/products";
import { _rejectAddFavoriteToProductDispatchType, _resolveAddFavoriteToProductDispatchType } from "../../redux/actions/product-action/dispatch-types";

/**
 * (helper) fetchFavoritePodutcs
 * @param _setFavoriteProdutcs: _resolveAddFavoriteToProductDispatchType 
 * @param _rejectAddFavoriteToProduct: _rejectAddFavoriteToProductDispatchType
 * @returns Promise<void>
 */
export const fetchFavoritePodutcs = async (
  _setFavoriteProdutcs: _resolveAddFavoriteToProductDispatchType,
  _rejectAddFavoriteToProduct: _rejectAddFavoriteToProductDispatchType
): Promise<void> => {
  return axios.get(api.favorite)
    .then((res) => _setFavoriteProdutcs(products))
    .catch((err) => (
      _rejectAddFavoriteToProduct({ status: err.response.status, message: err.response.statusText }),
      err
    ))
}