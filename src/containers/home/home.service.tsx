import axios from "axios";
import { api } from "../../constant/response/api";
import { configDataResponse } from "../../constant/response/configDataResponse";
import { _configSetBannerActionDispatchTypes, _configSetDelayActionDispatchTypes } from "../../redux/actions/config-action/dispatch-types";
import { _setDelayAction, _setBannersAction } from '../../redux/actions/config-action';

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
  return axios.get(api.url)
    .then(res => (_setDelay(configDataResponse.delay), res))
    .then(() => _setBanners(configDataResponse.navbar))
    .catch((err) => err)
}