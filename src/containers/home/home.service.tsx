import axios from "axios";
import { api } from "../../constant/response/api";
import { configDataResponse } from "../../constant/response/configDataResponse";
import { _configSetBannerActionDispatchTypes, _configSetDelayActionDispatchTypes } from "../../redux/actions/config-action/dispatch-types";
import { _setDelayAction, _setBannersAction } from '../../redux/actions/config-action';
import { products } from "../../constant/response/products";
import { _rejectAddFavoriteToProductDispatchTypes, _resolveAddFavoriteToProductDispatchTypes } from "../../redux/actions/product-action/dispatch-types";

/**
 * (helper) fetchConfigData
 * @param _setDelay: _configSetDelayActionDispatchTypes 
 * @param _setBanners: _configSetBannerActionDispatchTypes 
 * @returns Promise<void>
 */
export const fetchConfigData = async (
  _setDelay: _configSetDelayActionDispatchTypes,
  _setBanners: _configSetBannerActionDispatchTypes
): Promise<void> => {
  return axios.get(api.config)
    .then(res => (_setDelay(configDataResponse.delay), res))
    .then(() => _setBanners(configDataResponse.navbar))
    .catch((err) => err)
}

/**
 * (helper) fetchFavoritePodutcs
 * @param _setFavoriteProdutcs: _addFavoriteToProductDispatchTypes 
 * @param _rejectAddFavoriteToProduct: _rejectAddFavoriteToProductDispatchTypes
 * @returns Promise<void>
 */
export const fetchFavoritePodutcs = async (
  _setFavoriteProdutcs: _resolveAddFavoriteToProductDispatchTypes,
  _rejectAddFavoriteToProduct: _rejectAddFavoriteToProductDispatchTypes
): Promise<void> => {
  return axios.get(api.favorite)
    .then((res) => _setFavoriteProdutcs(products))
    .catch((err) => (
      _rejectAddFavoriteToProduct({ status: err.response.status, message: err.response.statusText }),
      err
    ))
}