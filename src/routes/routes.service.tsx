import axios from "axios"
import { api } from "../constant/response/api"
import { configDataResponse } from "../constant/response/configDataResponse"
import { _rejectGetConfigActionDispatchType, _resolveGetConfigActionDispatchType } from "../redux/actions/config-action/dispatch-types"

/**
 * (helper) fetchConfigData
 * @param _resolveGetConfigAction: _resolveGetConfigActionDispatchType 
 * @param _rejectGetConfigAction: _rejectGetConfigActionDispatchType
 * @returns Promise<void>
 */
export const fetchConfigData = async (
  _resolveGetConfigAction: _resolveGetConfigActionDispatchType,
  _rejectGetConfigAction: _rejectGetConfigActionDispatchType
): Promise<void> => {
  return axios.get(api.config)
    .then(() => _resolveGetConfigAction(configDataResponse.navbar))
    .catch((err) => (
      process.env.NODE_ENV === "test" ? err : _rejectGetConfigAction({ status: err.response.status, code: err.code, message: err.message })
    ))
}