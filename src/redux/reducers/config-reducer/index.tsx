import { configActionType } from "./action-types/configActionTypes.enum";
import { configActionInterface } from "./interface/configActionInterface";
import { configReducerInterface } from "./interface/configReducerInterface";

export const initialState = {
  loaded: false,
  delay: 0,
  banners: {
    navbar: {
      show: false,
      message: "",
      href: "",
      dismiss: false,
      type: ""
    }
  }
}

export const configReducer = (state: configReducerInterface = initialState, action: configActionInterface) => {
  switch (action.type) {
    case configActionType.ADD_CONFIG_DELAY:
      return {
        ...state,
        delay: action.payload.delay
      };

    case configActionType.ADD_CONFIG_BANNERS:
      return {
        ...state,
        loaded: true,
        banners: action.payload.banners
      };

    case configActionType.SET_BANNER_IN_NAVBAR_DISMISS:
      return {
        ...state,
        banners: {
          ...state.banners,
          navbar: {
            ...state.banners.navbar,
            show: false,
            dismiss: true
          }
        }
      };

    default:
      return state
  }
};