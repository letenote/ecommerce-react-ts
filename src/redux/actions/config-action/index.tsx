import { Dispatch } from "redux";
import { configActionType } from "../../reducers/config-reducer/action-types/configActionTypes.enum";
import { configActionInterface } from "../../reducers/config-reducer/interface/configActionInterface";
import { bannerNavbar } from "../../reducers/config-reducer/interface/configReducerInterface";

export const _setDelayAction = (delay: number) => {
  return (dispatch: Dispatch<configActionInterface>) => {
    dispatch({
      type: configActionType.ADD_CONFIG_DELAY,
      payload: {
        delay
      }
    });
  };
};

export const _setBannersAction = (navbar: bannerNavbar) => {
  return (dispatch: Dispatch<configActionInterface>) => {
    dispatch({
      type: configActionType.ADD_CONFIG_BANNERS,
      payload: {
        banners: {
          navbar
        }
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