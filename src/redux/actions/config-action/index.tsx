import { Dispatch } from "redux";
import { FetchStatus } from "../../../models/FetchStatus";
import { configActionType } from "../../reducers/config-reducer/action-types/configActionTypes.enum";
import { configActionInterface } from "../../reducers/config-reducer/interface/configActionInterface";
import { bannerNavbar } from "../../reducers/config-reducer/interface/configReducerInterface";

export const _resolveGetConfigAction = (navbar: bannerNavbar) => {
  return (dispatch: Dispatch<configActionInterface>) => {
    dispatch({
      type: configActionType.RESOLVE_ADD_CONFIG_BANNERS,
      payload: {
        status: 200,
        code: "OK",
        message: "Success Get Config..",
        banners: {
          navbar
        }
      }
    });
  };
};

export const _rejectGetConfigAction = (fetchStatus: FetchStatus) => {
  return (dispatch: Dispatch<configActionInterface>) => {
    dispatch({
      type: configActionType.REJECT_ADD_CONFIG_BANNERS,
      payload: {
        status: fetchStatus.status,
        code: fetchStatus.code,
        message: fetchStatus.message
      }
    });
  };
};

export const _setBannerInNavbarDismissAction = () => {
  return (dispatch: Dispatch<configActionInterface>) => {
    dispatch({
      type: configActionType.SET_BANNER_IN_NAVBAR_DISMISS
    });
  };
};