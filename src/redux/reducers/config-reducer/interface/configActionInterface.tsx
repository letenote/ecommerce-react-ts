import { configActionType } from "../action-types/configActionTypes.enum"
import { bannerNavbar } from "./configReducerInterface"

interface resolveAddConfigInterface {
  type: configActionType.RESOLVE_ADD_CONFIG_BANNERS,
  payload: {
    status: number,
    code: string,
    message: string
    banners: {
      navbar: bannerNavbar
    }
  }
};

interface rejectAddConfigInterface {
  type: configActionType.REJECT_ADD_CONFIG_BANNERS,
  payload: {
    status: number,
    code: string,
    message: string
  }
};

interface setBannerInNavbarDismissInterface {
  type: configActionType.SET_BANNER_IN_NAVBAR_DISMISS
}

export type configActionInterface = resolveAddConfigInterface
  | rejectAddConfigInterface
  | setBannerInNavbarDismissInterface