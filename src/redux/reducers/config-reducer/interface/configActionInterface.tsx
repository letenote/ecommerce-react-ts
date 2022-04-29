import { configActionType } from "../action-types/configActionTypes.enum"
import { bannerNavbar } from "./configReducerInterface"


interface addDelayInterface {
  type: configActionType.ADD_CONFIG_DELAY,
  payload: {
    delay: number
  }
};

interface addBannersInterface {
  type: configActionType.ADD_CONFIG_BANNERS,
  payload: {
    banners: {
      navbar: bannerNavbar
    }
  }
};

export type configActionInterface = addDelayInterface | addBannersInterface