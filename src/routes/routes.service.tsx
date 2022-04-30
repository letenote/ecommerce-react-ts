import axios from "axios"
import { api } from "../constant/response/api"
import { configDataResponse } from "../constant/response/configDataResponse"
import { _configSetBannerActionDispatchType, _configSetDelayActionDispatchType } from "../redux/actions/config-action/dispatch-types"

/**
 * (helper) fetchConfigData
 * @param _setDelay: _configSetDelayActionDispatchType 
 * @param _setBanners: _configSetBannerActionDispatchType 
 * @returns Promise<void>
 */
export const fetchConfigData = async (
  _setDelay: _configSetDelayActionDispatchType,
  _setBanners: _configSetBannerActionDispatchType
): Promise<void> => {
  return axios.get(api.config)
    .then(res => (_setDelay(configDataResponse.delay), res))
    .then(() => _setBanners(configDataResponse.navbar))
    .catch((err) => err)
}